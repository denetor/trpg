import {Actor, Collider, CollisionStartEvent, Engine, Logger, Scene, vec, Vector} from "excalibur";
import {ItemDestroyedActor} from "../misc/item-destroyed.actor";
import {Character} from "../../models/character.model";
import {ActorArgs} from "excalibur/build/dist/Actor";
import {status} from '../../main';
import {States} from "../../models/states.enum";
import {Config} from '../../config';
import {MissileActor} from "../weapons/missile.actor";

/**
 * Generic NPC base class
 */
export class NpcActor extends Actor {
    // interval between AI runs
    aiInterval: number = 100;
    model: Character = undefined as any;
    // ms elapsed from last AI run
    lastAiUpdateElapsed: number = 0;
    canAttackAgain: boolean = true;
    rangedAttackInterval: number = 1000;


    constructor(config?: ActorArgs) {
        super(config);
    }


    /**
     * Initializes the actor and sets up event listeners for pointer interactions.
     * This method is called during the initialization phase of the engine lifecycle.
     *
     * @param {Engine} engine - The current instance of the game engine.
     * @return {void} Does not return a value.
     */
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
        if (this.lastAiUpdateElapsed >= this.aiInterval) {
            this.lastAiUpdateElapsed = 0;
            this.model.updateState(engine);
            this.doAction(engine, elapsed);
        } else {
            this.lastAiUpdateElapsed += elapsed;
        }
    }


    /**
     * Handles the actions to be performed immediately after the object is "killed" or destroyed within a scene.
     * This method invokes the parent `onPostKill` logic and adds a transitory animation, such as a "dust" effect.
     *
     * @param {Scene} scene - The current scene where the object was destroyed.
     * @return {void} This method does not return a value.
     */
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


    /**
     * Executes (or keeps executing) an action
     *
     * @param engine
     * @param elapsed
     */
    doAction(engine: Engine, elapsed: number): void {
        switch (this.model.currentState) {
            case States.CHASE_PLAYER:
                this.doChasePlayer();
                break;
            case States.FLEE_PLAYER:
                this.doFleeFromPlayer();
                break;
            case States.FIGHT_PLAYER:
                this.doFightPlayer(engine);
                break;
            case States.WANDER:
                this.doWander();
                break;
            case States.IDLE:
            default:
                // do nothing
        }
    }


    /**
     * Chases the player: move towards him
     */
    doChasePlayer(): void {
        this.actions.clearActions();
        this.actions.moveTo(this.model.playerPosition, this.model.getWalkSpeed());
    }


    /**
     * Flee from player: move in opposite direction. Stops when player is no more nearby
     */
    doFleeFromPlayer(): void {
        this.actions.clearActions();
        const targetPosition = vec(
            Math.min(Config.game.nearbyPlayerDistance, Math.abs(this.model.playerPosition.x - this.pos.x)) * (this.model.playerPosition.x > this.pos.x ? -1 : 1) + this.pos.x,
            Math.min(Config.game.nearbyPlayerDistance, Math.abs(this.model.playerPosition.y - this.pos.y)) * (this.model.playerPosition.y > this.pos.y ? -1 : 1) + this.pos.y
        );
        this.actions.moveTo(targetPosition, this.model.getWalkSpeed());
    }


    /**
     * Executes the wandering behavior for an NPC. Sets a random destination if none exists,
     * moves the NPC toward the destination, and resets the destination upon completion.
     * It ensures that the NPC continues to wander within the specified range.
     *
     * @return {void} No return value. The method modifies the NPC's state and actions internally.
     */
    doWander(): void {
        // if have no wandering center, set a new one
        if (!this.model.wanderCenter) {
            this.model.wanderCenter = vec(this.pos.x, this.pos.y);
        }
        // set a destination, if missing
        if (!this.model.wanderDestination) {
            this.model.wanderDestination = vec(
                this.model.wanderCenter.x + Math.random() * Config.game.wanderingRadius - Config.game.wanderingRadius / 2,
                this.model.wanderCenter.y + Math.random() * Config.game.wanderingRadius - Config.game.wanderingRadius / 2
            );
        }
        // reset destination when done. NPC will create a new one at the next round
        if (this.model.wanderDestination && this.model.wanderDestination.x === this.pos.x && this.model.wanderDestination.y === this.pos.y) {
            this.model.wanderDestination = undefined as any;
        } else if (this.model.wanderDestination) {
            // go to destination
            this.actions.clearActions();
            this.actions.moveTo(this.model.wanderDestination, this.model.getWalkSpeed() / 2);
        }
        // TODO if too much time is spent to reach destination, reset it (maybe this is not needed)
    }


    /**
     * Executes the NPC's attack logic in a combat scenario with the player.
     * If the NPC has a missile weapon available and is able to attack, it will spawn a missile aimed at the player's current position.
     *
     * @param {Engine} engine - The game engine used to manage game state, including scheduling future actions and handling scenes.
     * @return {void} This method does not return a value.
     */
    doFightPlayer(engine: Engine): void {
        // if the next attack timeout is nopt timed out, exit
        if (!this.canAttackAgain) {
            return;
        }
        // if any missile weapon is available, fire missile and set next attack timeout
        if (this.hasMissileWeapon() && this.scene) {
            // spawn a missile ammo at npc position and set action to the current player position
            // const missile = new MissileActor({x: this.pos.x, y: this.pos.y, destination: this.model.playerPosition});
            const missile = this.getMissileActor(this.pos, this.model.playerPosition);
            this.scene.add(missile);
            Logger.getInstance().info(`[${this.name}] fired missile at (${this.model.playerPosition.x}, ${this.model.playerPosition.y})`);
            // timer for the next attack
            this.canAttackAgain = false;
            engine.clock.schedule(() => {
                this.canAttackAgain = true;
            }, this.rangedAttackInterval);
        }
    }


    /**
     * Creates and returns a new MissileActor object initialized with the specified position and destination.
     * Overwrite in subclasses to change the missile and not the logic
     *
     * @param {Vector} pos - The starting position of the missile, represented as a Vector object.
     * @param {Vector} destination - The target destination of the missile, represented as a Vector object.
     * @return {MissileActor} A new instance of the MissileActor class configured with the given position and destination.
     */
    getMissileActor(pos: Vector, destination: Vector): MissileActor {
        return new MissileActor({x: pos.x, y: pos.y, destination});
    }


    /**
     * Determines if the entity is equipped with a missile weapon.
     * @return {boolean} Returns true if the entity has a missile weapon, otherwise false.
     */
    hasMissileWeapon(): boolean {
        // TODO real test, ammunition qty included
        return true;
    }


    /**
     * Determines if there is a contact weapon available.
     * Typically used to check if an entity possesses a weapon that requires physical contact to be effective.
     *
     * @return {boolean} Returns true if a contact weapon is available, false otherwise.
     */
    hasContactWeapon(): boolean {
        return true;
    }


}
