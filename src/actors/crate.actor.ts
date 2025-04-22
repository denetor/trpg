import {Actor, Color, Engine, Font, FontUnit, Label, Scene, SpriteSheet, vec, Vector} from "excalibur";
import * as ex from "excalibur";
import {Resources} from "../resources";
import {Crate} from "../models/items/crate.model";
import {SwordHitActor} from "./misc/sword-hit.actor";
import {ItemDestroyedActor} from "./misc/item-destroyed.actor";

export class CrateActor extends Actor {
    model: Crate;
    spriteSize: Vector;

    constructor(pos: ex.Vector) {
        super({
            pos,
            width: 16,
            height: 16,
            collisionType: ex.CollisionType.Active,
            name: 'crate',
        });
        this.model = new Crate();
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


    onPreUpdate(engine: Engine, elapsed: number) {
        if (this.model.health <= 0) {
            this.kill();
        }
    }


    onPostKill(scene: Scene) {
        super.onPostKill(scene);
        // add transitory "dust" animation
        const cloudsActor = new ItemDestroyedActor({x: this.pos.x, y: this.pos.y});
        if (cloudsActor !== null && cloudsActor !== undefined && this.scene !== null && this.scene !== undefined) {
            this.scene.add(cloudsActor);
        }
    }
}
