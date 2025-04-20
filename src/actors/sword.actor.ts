import {Actor, AnimationStrategy, Engine, SpriteSheet, vec} from "excalibur";
import {Resources} from "../resources";
import {AnimationFactory} from "../factories/animation.factory";

export class SwordActor extends Actor {
    SWING_FRAME_DURATION = 100;

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
}