import {Actor, Collider, CollisionStartEvent, Engine, Logger, Scene} from "excalibur";
import {ItemDestroyedActor} from "../misc/item-destroyed.actor";
import {Character} from "../../models/character.model";
import {ActorArgs} from "excalibur/build/dist/Actor";
import {status} from '../../main';

/**
 * Generic NPC base class
 */
export class NpcActor extends Actor {
    // interval between AI runs
    static AI_INTERVAL = 1000;
    model: Character = undefined as any;
    // ms elapsed from last AI run
    lastAiUpdateElapsed: number = 0;


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


    /**
     * This method is invoked before the update cycle for handling pre-update logic, such as AI state updates
     * and checking the entity's health to determine if it should be removed.
     *
     * @param {Engine} engine - The game engine instance managing the current state of the game.
     * @param {number} elapsed - The time elapsed since the last update, in milliseconds.
     * @return {void} This method does not return a value.
     */
    onPreUpdate(engine: Engine, elapsed: number): void {
        super.onPreUpdate(engine, elapsed);
        if (this.model.health <= 0) {
            this.kill();
        }
        if (this.lastAiUpdateElapsed >= NpcActor.AI_INTERVAL) {
            this.lastAiUpdateElapsed = 0;
            this.model.updateState(engine);
        } else {
            this.lastAiUpdateElapsed += elapsed;
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
