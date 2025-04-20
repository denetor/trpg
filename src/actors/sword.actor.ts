import {Actor, Engine, SpriteSheet, vec} from "excalibur";
import {Resources} from "../resources";
import {AnimationFactory} from "../factories/animation.factory";

export class SwordActor extends Actor {

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
        this.graphics.add('swordN', AnimationFactory.createScaled(spriteSheet, vec(32, 32), [
            { x: 0, y: 5, duration: 125 },
            { x: 1, y: 5, duration: 125 },
            { x: 2, y: 5, duration: 125 },
            { x: 1, y: 5, duration: 125 },
        ]));
        this.graphics.add('swordE', AnimationFactory.createScaled(spriteSheet, vec(32, 32), [
            { x: 0, y: 6, duration: 125 },
            { x: 1, y: 6, duration: 125 },
            { x: 2, y: 6, duration: 125 },
            { x: 1, y: 6, duration: 125 },
        ]));
        this.graphics.add('swordS', AnimationFactory.createScaled(spriteSheet, vec(32, 32), [
            { x: 0, y: 4, duration: 125 },
            { x: 1, y: 4, duration: 125 },
            { x: 2, y: 4, duration: 125 },
            { x: 1, y: 4, duration: 125 },
        ]));
        this.graphics.add('swordW', AnimationFactory.createScaled(spriteSheet, vec(32, 32), [
            { x: 0, y: 7, duration: 125 },
            { x: 1, y: 7, duration: 125 },
            { x: 2, y: 7, duration: 125 },
            { x: 1, y: 7, duration: 125 },
        ]));
    }
}