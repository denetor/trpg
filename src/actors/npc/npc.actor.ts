import {Actor, Collider, CollisionStartEvent, Engine, Logger, Scene} from "excalibur";
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
            status.selectedActor.selectedTs = Date.now() as any;
        });
        this.on('pointerleave', () => {
            status.selectedActor.actor = null;
            status.selectedActor.selectedTs = null;
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


    /**
     * Add a round proximity detector child actor.
     *
     * @param radius {number}
     */
    addDetector(radius: number) {
        const detector = new Actor({
            radius,
        });
        this.addChild(detector);
        detector.on('collisionstart', (evt) => {
            this.onDetector(evt);
        })
    }


    /**
     * When a detector detects a collision
     * @param evt
     */
    onDetector(evt: CollisionStartEvent<Collider>): void {
        Logger.getInstance().info(`[${evt.self.owner.name}] detected ${evt.other.owner.name}`)
    }


}