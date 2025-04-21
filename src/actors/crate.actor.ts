import {Actor, Engine, SpriteSheet, vec, Vector} from "excalibur";
import * as ex from "excalibur";
import {Resources} from "../resources";

export class CrateActor extends Actor {
    spriteSize: Vector;

    constructor(pos: ex.Vector) {
        super({
            pos,
            width: 16,
            height: 16,
            collisionType: ex.CollisionType.Active,
            name: 'crate',
        });
        this.z = 50;
        this.spriteSize = vec(16, 16);
    }


    onInitialize(engine: Engine) {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.solariaSpriteSheetImage,
            grid: {
                rows: 28,
                columns: 15,
                spriteWidth: 16,
                spriteHeight: 16,
            },
        });
        this.graphics.add('idle', spriteSheet.getSprite(5, 10));
        this.graphics.use('idle');
    }
}