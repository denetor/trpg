import {Actor, Engine, Scene} from "excalibur";
import {ItemDestroyedActor} from "../misc/item-destroyed.actor";
import {Character} from "../../models/character.model";

/**
 * Generic NPC base class
 */
export class NpcActor extends Actor {
    model: Character = undefined as any;



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