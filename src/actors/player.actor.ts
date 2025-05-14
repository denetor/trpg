import {
    Animation,
    Actor,
    CircleCollider,
    CollisionType,
    Engine,
    Keys,
    SpriteSheet,
    vec,
    Vector,
    Color,
    Logger
} from "excalibur";
import {Player} from "../models/player.model";
import {Resources} from "../resources";
import {AnimationFactory} from "../factories/animation.factory";
import {SwordActor} from "./sword.actor";
import {ContactAttackStatus} from "./contact-attack-status.enum";
import {ScreenMessage} from "./ui/screen-message";
import {Talkable} from "./talkable.interface";
import {EphemeralMessage} from "./misc/ephemeral-message.actor";
import {SwordHitActor} from "./misc/sword-hit.actor";
import {DamageLabel} from "./misc/damage-label.actor";

export class PlayerActor extends Actor implements Talkable {
    model: Player;
    state: string;
    direction: string;
    spriteSize: Vector;
    contactAttackStatus: ContactAttackStatus;

    constructor(pos: ex.Vector) {
        super({
            pos,
            collider: new CircleCollider({radius: 6, offset: vec(0, 6)}),
            collisionType: CollisionType.Active,
            name: 'player',
        });
        this.spriteSize = vec(16, 24);
        this.z = 100;
        this.model = new Player();
        this.state = 'idle';
        this.direction = 'S';
        this.contactAttackStatus = ContactAttackStatus.None;


    }


    onInitialize(engine: Engine) {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.darkMageSpriteSheet,
            grid: {
                rows: 4,
                columns: 3,
                spriteWidth: 48,
                spriteHeight: 64,
            },
        });

        // idle animations
        this.graphics.add('idleN', AnimationFactory.createScaled({spriteSheet, targetSize: vec(this.spriteSize.x,this.spriteSize.y), frames: [{ x: 1, y: 0, duration: 1000 }]}));
        this.graphics.add('idleE', AnimationFactory.createScaled({spriteSheet, targetSize: vec(this.spriteSize.x,this.spriteSize.y), frames: [{ x: 1, y: 1, duration: 1000 }]}));
        this.graphics.add('idleS', AnimationFactory.createScaled({spriteSheet, targetSize: vec(this.spriteSize.x,this.spriteSize.y), frames: [{ x: 1, y: 2, duration: 1000 }]}));
        this.graphics.add('idleW', AnimationFactory.createScaled({spriteSheet, targetSize: vec(this.spriteSize.x,this.spriteSize.y), frames: [{ x: 1, y: 3, duration: 1000 }]}));
        // walk animations
        this.graphics.add('walkN', AnimationFactory.createScaled({spriteSheet, targetSize: vec(this.spriteSize.x,this.spriteSize.y), frames: [
            { x: 0, y: 0, duration: 125 },
            { x: 1, y: 0, duration: 125 },
            { x: 2, y: 0, duration: 125 },
            { x: 1, y: 0, duration: 125 },
        ]}));
        this.graphics.add('walkE', AnimationFactory.createScaled({spriteSheet, targetSize: vec(this.spriteSize.x,this.spriteSize.y), frames: [
            { x: 0, y: 1, duration: 125 },
            { x: 1, y: 1, duration: 125 },
            { x: 2, y: 1, duration: 125 },
            { x: 1, y: 1, duration: 125 },
        ]}));
        this.graphics.add('walkS', AnimationFactory.createScaled({spriteSheet, targetSize: vec(this.spriteSize.x,this.spriteSize.y), frames: [
            { x: 0, y: 2, duration: 125 },
            { x: 1, y: 2, duration: 125 },
            { x: 2, y: 2, duration: 125 },
            { x: 1, y: 2, duration: 125 },
        ]}));
        this.graphics.add('walkW', AnimationFactory.createScaled({spriteSheet, targetSize: vec(this.spriteSize.x,this.spriteSize.y), frames: [
            { x: 0, y: 3, duration: 125 },
            { x: 1, y: 3, duration: 125 },
            { x: 2, y: 3, duration: 125 },
            { x: 1, y: 3, duration: 125 },
        ]}));

        // add sword as a child actor
        const swordActor = new SwordActor();
        swordActor.name = 'sword';
        this.addChild(swordActor);
    }


    onPreUpdate(engine: Engine, elapsed: number) {
        // detect keypresses to manage movement
        // temporary: to be centralized
        if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
            this.state = 'walk';
            this.direction = 'E';
            this.vel = vec(this.model.getWalkSpeed(), this.vel.y);
        } else if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
            this.state = 'walk';
            this.direction = 'W';
            this.vel = vec(-this.model.getWalkSpeed(), this.vel.y);
        } else {
            this.vel = vec(0, this.vel.y);
        }
        if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
            this.state = 'walk';
            this.direction = 'N';
            this.vel = vec(this.vel.x, -this.model.getWalkSpeed());
        } else if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
            this.state = 'walk';
            this.direction = 'S';
            this.vel = vec(this.vel.x, this.model.getWalkSpeed());
        } else {
            this.vel = vec(this.vel.x, 0);
        }
        if (!engine.input.keyboard.isHeld(Keys.ArrowDown) && !engine.input.keyboard.isHeld(Keys.ArrowUp) &&
            !engine.input.keyboard.isHeld(Keys.ArrowLeft) && !engine.input.keyboard.isHeld(Keys.ArrowRight)) {
            this.state = 'idle';
            this.vel = vec(0, 0);
        }
        if (engine.input.keyboard.isHeld(Keys.Space) && this.contactAttackStatus === ContactAttackStatus.None) {
            this.state = 'swordAttack';
            this.contactAttackStatus = ContactAttackStatus.Init;
        }

        // apply animation basing on state
        if (this.state === 'idle') {
            this.graphics.use(`idle${this.direction}`);
        }
        else if (this.state === 'walk') {
            this.graphics.use(`walk${this.direction}`);
        }

        // sword attack animation management
        if (this.state === 'swordAttack' && this.contactAttackStatus === ContactAttackStatus.Init) {
            // start sword attack
            this.contactAttackStatus = ContactAttackStatus.Active;
            const swordActor: Actor = this.children.find(c => c.name === 'sword') as Actor;
            if (swordActor) {
                switch (this.direction) {
                    case 'N':
                        swordActor.pos = vec(2, -8);
                        break;
                    case 'E':
                        swordActor.pos = vec(4, 0);
                        break;
                    case 'S':
                        swordActor.pos = vec(-2, 8);
                        break;
                    case 'W':
                        swordActor.pos = vec(-4, 0);
                        break;
                }
                // prepare animation
                swordActor.graphics.use(`swing${this.direction}`);
                const animation: Animation = swordActor.graphics.getGraphic(`swing${this.direction}`) as any as Animation;
                animation.reset();
                animation.goToFrame(0);
                animation.play();
                swordActor.graphics.isVisible = true;
                // activate collider on swing
                swordActor.collider.useCircleCollider(8);
                // subscribe to animation to detect when it's finished
                animation.events.on('end', (a) => {
                    swordActor.graphics.isVisible = false;
                    // deactivate collider at the end
                    swordActor.collider.clear();
                    this.contactAttackStatus = ContactAttackStatus.None;
                    this.state = 'idle';
                });
            }
        }

        // debug: display message
        if (engine.input.keyboard.wasPressed(Keys.A) && this.scene) {
            // Create a new message actor with auto-hide after 3 seconds
            const messageActor = new ScreenMessage({
                engine: this.scene.engine,
                text: 'Hello World\nthis is\na multiline message!',
                autoHideAfterMs: 3000,
                hideOnClick: true,
                fontColor: Color.Yellow,
            });
            this.scene.add(messageActor);
        }


        // debug: display ephemeral message
        if (engine.input.keyboard.wasPressed(Keys.H) && this.scene) {
            this.say('Hello World');
        }
    }


    /**
     * Implementation od Talkable interface
     * @param message
     */
    say(message: string): void {
        if (this.scene) {
            const msg = new EphemeralMessage({message, actor: this});
            this.scene.add(msg);
        }
    }


    /**
     * Handles the action when the current actor takes a hit from a weapon.
     * Manages applying damage, displaying a damage label, and specific interactions like destroying a missile.
     *
     * @param {Actor} weapon - The weapon object that inflicted the hit. The weapon must have a `damage` property.
     *                         Specific actions are taken if the weapon's name is 'missile'.
     * @return {void} Does not return any value.
     */
    takeHit(weapon: Actor): void {
        if (weapon && (weapon as any)?.damage) {
            const damage = (weapon as any)?.damage;
            this.model.takeHit(damage);
            const damageLabel = new DamageLabel({damage, pos: vec(this.pos.x, this.pos.y)});
            if (this.scene !== null && this.scene !== undefined) {
                this.scene.add(damageLabel);
                const shakeEntity = (damage / this.model.health * 100) / 25;
                this.scene.camera.shake(shakeEntity, shakeEntity, 100);
            }
        }
        if (weapon.name === 'missile') {
            weapon.kill();
        }
    }

}
