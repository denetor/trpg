import {Actor, Engine, Logger, Scene} from "excalibur";
import {ItemDestroyedActor} from "../misc/item-destroyed.actor";
import {Character} from "../../models/character.model";
import {ActorArgs} from "excalibur/build/dist/Actor";
import {status} from '../../main';

/**
 * Generic NPC base class
 */
export class NpcActor extends Actor {
    model: Character = undefined as any;


    constructor(config?: ActorArgs) {
        super(config);
    }


    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        // update currently selected actor in status
        this.on('pointerenter', () => {
            status.selectedActor.actor = this as any;
            status.selectedActor.selectedAt = new Date() as any;
        });
        this.on('pointerleave', () => {
            status.selectedActor.actor = null;
            status.selectedActor.selectedAt = null;
        });
    }



    onPreUpdate(engine: Engine, elapsed: number) {
        super.onPreUpdate(engine, elapsed);
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