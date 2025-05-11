import {Actor, AnimationStrategy, Collider, CollisionContact, Engine, Side, SpriteSheet, vec} from "excalibur";
import {Resources} from "../resources";
import {AnimationFactory} from "../factories/animation.factory";
import {Sword} from "../models/weapons/sword.model";
import {SwordHitActor} from "./misc/sword-hit.actor";
import {DamageLabel} from "./misc/damage-label.actor";

export class SwordActor extends Actor {
    SWING_FRAME_DURATION = 100;
    model: Sword;


    constructor() {
        super({
            // radius: 8,
            name: 'sword',
        });
        this.model = new Sword();
    }

    onInitialize(engine: Engine) {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.swordSpriteSheet,
            grid: {
                rows: 8,
                columns: 4,
                spriteWidth: 32,
                spriteHeight: 32,
            }
        });

        // sword animations
        this.graphics.add('swingN', AnimationFactory.createScaled({spriteSheet, targetSize: vec(32, 32), strategy: AnimationStrategy.End, frames: [
            { x: 0, y: 5, duration: this.SWING_FRAME_DURATION },
            { x: 1, y: 5, duration: this.SWING_FRAME_DURATION },
            { x: 2, y: 5, duration: this.SWING_FRAME_DURATION },
            { x: 3, y: 5, duration: this.SWING_FRAME_DURATION },
        ]}));
        this.graphics.add('swingE', AnimationFactory.createScaled({spriteSheet, targetSize: vec(32, 32), strategy: AnimationStrategy.End, frames: [
            { x: 0, y: 6, duration: this.SWING_FRAME_DURATION },
            { x: 1, y: 6, duration: this.SWING_FRAME_DURATION },
            { x: 2, y: 6, duration: this.SWING_FRAME_DURATION },
            { x: 3, y: 6, duration: this.SWING_FRAME_DURATION },
        ]}));
        this.graphics.add('swingS', AnimationFactory.createScaled({spriteSheet, targetSize: vec(32, 32), strategy: AnimationStrategy.End, frames: [
            { x: 0, y: 4, duration: this.SWING_FRAME_DURATION },
            { x: 1, y: 4, duration: this.SWING_FRAME_DURATION },
            { x: 2, y: 4, duration: this.SWING_FRAME_DURATION },
            { x: 3, y: 4, duration: this.SWING_FRAME_DURATION },
        ]}));
        this.graphics.add('swingW', AnimationFactory.createScaled({spriteSheet, targetSize: vec(32, 32), strategy: AnimationStrategy.End, frames: [
            { x: 0, y: 7, duration: this.SWING_FRAME_DURATION },
            { x: 1, y: 7, duration: this.SWING_FRAME_DURATION },
            { x: 2, y: 7, duration: this.SWING_FRAME_DURATION },
            { x: 3, y: 7, duration: this.SWING_FRAME_DURATION },
        ]}));
        this.graphics.isVisible = false;
    }


    onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact) {
        super.onCollisionStart(self, other, side, contact);
        // ignore hitting sword owner
        if (this.parent && other.owner.id !== this.parent.id) {
            // send damage to hit entity
            if ((other.owner as any).model) {
                const damage = (other.owner as any).model.takeHit(this.model.getDamage());
                if (damage > 0) {
                    const damageLabel = new DamageLabel({damage, pos: vec(contact.points[0].x, contact.points[0].y)});
                    if (this.scene !== null && this.scene !== undefined) {
                        this.scene.add(damageLabel);
                    }
                    // spawn hit animation
                    const hitActor = new SwordHitActor({x: contact.points[0].x, y: contact.points[0].y});
                    if (hitActor !== null && hitActor !== undefined && this.scene !== null && this.scene !== undefined) {
                        this.scene.add(hitActor);
                    }
                }
            }
        }
    }
}
