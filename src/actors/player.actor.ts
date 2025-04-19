import {Actor, Animation, CircleCollider, Engine, SpriteSheet, vec, Vector} from "excalibur";
import {Player} from "../models/player.model";
import * as ex from "excalibur";
import {Resources} from "../resources";
import {AnimationFactory} from "../factories/animation.factory";

export class PlayerActor extends Actor {
    model: Player;
    state: string;
    direction: string;
    spriteSize: Vector;

    constructor(pos: ex.Vector) {
        super({
            pos,
            collider: new CircleCollider({radius: 6, offset: vec(0, 6)}),
            collisionType: ex.CollisionType.Active
        });
        this.model = new Player();
        this.state = 'idle';
        this.direction = 'S';
        this.z = 100;
        this.spriteSize = vec(16, 24);
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

        // prepare animations
        this.graphics.add('idleN', AnimationFactory.createScaled(spriteSheet, vec(this.spriteSize.x,this.spriteSize.y), [{ x: 1, y: 0, duration: 1000 }]));
        this.graphics.add('idleE', AnimationFactory.createScaled(spriteSheet, vec(this.spriteSize.x,this.spriteSize.y), [{ x: 1, y: 1, duration: 1000 }]));
        this.graphics.add('idleS', AnimationFactory.createScaled(spriteSheet, vec(this.spriteSize.x,this.spriteSize.y), [{ x: 1, y: 2, duration: 1000 }]));
        this.graphics.add('idleW', AnimationFactory.createScaled(spriteSheet, vec(this.spriteSize.x,this.spriteSize.y), [{ x: 1, y: 3, duration: 1000 }]));
        // walk
        this.graphics.add('walkN', AnimationFactory.createScaled(spriteSheet, vec(this.spriteSize.x,this.spriteSize.y), [
            { x: 0, y: 0, duration: 125 },
            { x: 1, y: 0, duration: 125 },
            { x: 2, y: 0, duration: 125 },
            { x: 1, y: 0, duration: 125 },
        ]));
        this.graphics.add('walkE', AnimationFactory.createScaled(spriteSheet, vec(this.spriteSize.x,this.spriteSize.y), [
            { x: 0, y: 1, duration: 125 },
            { x: 1, y: 1, duration: 125 },
            { x: 2, y: 1, duration: 125 },
            { x: 1, y: 1, duration: 125 },
        ]));
        this.graphics.add('walkS', AnimationFactory.createScaled(spriteSheet, vec(this.spriteSize.x,this.spriteSize.y), [
            { x: 0, y: 2, duration: 125 },
            { x: 1, y: 2, duration: 125 },
            { x: 2, y: 2, duration: 125 },
            { x: 1, y: 2, duration: 125 },
        ]));
        this.graphics.add('walkW', AnimationFactory.createScaled(spriteSheet, vec(this.spriteSize.x,this.spriteSize.y), [
            { x: 0, y: 3, duration: 125 },
            { x: 1, y: 3, duration: 125 },
            { x: 2, y: 3, duration: 125 },
            { x: 1, y: 3, duration: 125 },
        ]));
    }


    onPreUpdate(engine: Engine, elapsed: number) {
        // detect keypresses to manage movement
        // temporary: to be centralized
        if (engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
            this.state = 'walk';
            this.direction = 'E';
            this.vel = ex.vec(this.model.getWalkSpeed(), this.vel.y);
        } else if (engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
            this.state = 'walk';
            this.direction = 'W';
            this.vel = ex.vec(-this.model.getWalkSpeed(), this.vel.y);
        } else {
            this.vel = ex.vec(0, this.vel.y);
        }
        if (engine.input.keyboard.isHeld(ex.Keys.ArrowUp)) {
            this.state = 'walk';
            this.direction = 'N';
            this.vel = ex.vec(this.vel.x, -this.model.getWalkSpeed());
        } else if (engine.input.keyboard.isHeld(ex.Keys.ArrowDown)) {
            this.state = 'walk';
            this.direction = 'S';
            this.vel = ex.vec(this.vel.x, this.model.getWalkSpeed());
        } else {
            this.vel = ex.vec(this.vel.x, 0);
        }
        if (!engine.input.keyboard.isHeld(ex.Keys.ArrowDown) && !engine.input.keyboard.isHeld(ex.Keys.ArrowUp) &&
            !engine.input.keyboard.isHeld(ex.Keys.ArrowLeft) && !engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
            this.state = 'idle';
            this.vel = ex.vec(0, 0);
        }

        // apply animation basing on state
        if (this.state === 'idle') {
            this.graphics.use(`idle${this.direction}`);
        }
        else if (this.state === 'walk') {
            this.graphics.use(`walk${this.direction}`);
        }
    }
}