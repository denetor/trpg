import {Actor, Animation, AnimationStrategy, Engine, SpriteSheet, vec} from "excalibur";
import {Resources} from "../../resources";
import {AnimationFactory} from "../../factories/animation.factory";

/**
 * Represents the "clouds" animation of an item that has been destroyed
 */
export class ItemDestroyedActor extends Actor {


    onInitialize(engine: Engine) {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.customSpriteSheet,
            grid: {
                rows: 16,
                columns: 16,
                spriteWidth: 16,
                spriteHeight: 16,
            }
        });
        this.graphics.add('default', AnimationFactory.createScaled({spriteSheet, targetSize: vec(16, 16), strategy: AnimationStrategy.End, frames: [
                { x: 0, y: 1, duration: 200 },
                { x: 1, y: 1, duration: 200 },
                { x: 2, y: 1, duration: 200 },
            ]}));
        // animate once and kill yourself
        const animation: Animation = this.graphics.getGraphic(`default`) as any as Animation;
        animation.events.on('end', (a) => {
            this.kill();
        });
    }

}
