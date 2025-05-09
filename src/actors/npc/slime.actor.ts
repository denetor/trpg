import {NpcActor} from "./npc.actor";
import * as ex from "excalibur";
import {Collider, CollisionStartEvent, Engine, Logger, SpriteSheet, vec, Vector} from "excalibur";
import {Resources} from "../../resources";
import {AnimationFactory} from "../../factories/animation.factory";
import {Character} from "../../models/character.model";
import {Talkable} from "../talkable.interface";
import {EphemeralMessage} from "../misc/ephemeral-message.actor";

export class SlimeActor extends NpcActor implements Talkable {
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
        super.onInitialize(engine);
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

        this.addDetector(100);
    }


    /**
     * Overwrite collider to respond only to specific collisions
     * @param evt
     */
    onDetector(evt: CollisionStartEvent<Collider>): void {
        if (evt.other.owner.name === 'player') {
            Logger.getInstance().info(`[${evt.self.owner.name}] detected ${evt.other.owner.name}`)
            this.say('Hi, player');
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


}