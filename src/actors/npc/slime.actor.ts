import {NpcActor} from "./npc.actor";
import * as ex from "excalibur";
import {Engine, SpriteSheet, vec, Vector} from "excalibur";
import {Resources} from "../../resources";
import {AnimationFactory} from "../../factories/animation.factory";
import {Character} from "../../models/character.model";

export class SlimeActor extends NpcActor {
    spriteSize: Vector;


    constructor(pos: ex.Vector) {
        super({
            pos,
            width: 16,
            height: 16,
            collisionType: ex.CollisionType.Active,
            name: 'crate',
        });
        this.model = new Character();
        this.z = 50;
        this.spriteSize = vec(16, 16);
    }


    onInitialize(engine: Engine) {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.slimeSpriteSheet,
            grid: {
                rows: 4,
                columns: 3,
                spriteWidth: 48,
                spriteHeight: 48,
            },
        });
        this.graphics.add('idleN', AnimationFactory.createScaled({spriteSheet, targetSize: vec(this.spriteSize.x,this.spriteSize.y), frames: [{ x: 0, y: 0, duration: 500 },{ x: 1, y: 0, duration: 500 }]}));
        this.graphics.use('idleN');
    }


}