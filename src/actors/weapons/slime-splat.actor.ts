import {MissileActor} from "./missile.actor";
import {Engine, SpriteSheet, vec} from "excalibur";
import {Resources} from "../../resources";
import {AnimationFactory} from "../../factories/animation.factory";

export class SlimeSplatActor extends MissileActor {


    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.miscSpriteSheet,
            grid: {
                rows: 2,
                columns: 3,
                spriteWidth: 16,
                spriteHeight: 16,
            },
        });
        this.graphics.add('default', AnimationFactory.createScaled({spriteSheet, targetSize: vec(16,16), frames: [{ x: 0, y: 1, duration: 250 },{ x: 0, y: 1, duration: 250 }]}));
        this.graphics.use('default');
    }
}
