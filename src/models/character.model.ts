import {EasingsService} from "../services/easings.service";
import {Hittable} from "./hittable.interface";
import {Actor, Engine, Logger, Vector} from "excalibur";
import {States} from "./states.enum";
import {StateManager} from "./state-manager.model";
import {Config} from '../config';


export interface CharacterCreateOptions {
    strength?: number;
    agility?: number;
    intelligence?: number;
    armor?: number;
    maxHealth?: number;
    health?: number;
}


export class Character implements Hittable {
    static INITIAL_ABILITY_VALUE = 40;
    static INITIAL_HEALTH = 100;
    static SPEED_MULTIPLIER = 50;
    // main stats
    strength: number;
    agility: number;
    intelligence: number;
    armor: number;
    maxHealth: number;

    // current status
    health: number;

    // this Actor
    actor: Actor = undefined as any;

    // states management
    availableStates = [States.IDLE, States.WANDER, States.FIGHT_PLAYER, States.CHASE_PLAYER, States.FLEE_PLAYER];
    currentState = States.IDLE;
    // useful state variables
    playerPosition: Vector = null as any;
    playerDistance: number = null as any;
    isPlayerNearby = false;
    isPlayerAttackable = false;


    constructor(options?: CharacterCreateOptions) {
        this.strength = options?.strength ?? Character.INITIAL_ABILITY_VALUE;
        this.agility = options?.agility ?? Character.INITIAL_ABILITY_VALUE;
        this.intelligence = options?.intelligence ?? Character.INITIAL_ABILITY_VALUE;
        this.armor = options?.armor ?? 0;
        this.maxHealth = options?.maxHealth ?? Character.INITIAL_HEALTH;
        this.health = options?.health ?? options?.maxHealth ?? Character.INITIAL_HEALTH;
    }


    /**
     * Calculates and returns the walking speed of an entity based on its agility.
     *
     * The walking speed is determined using a mathematical easing function to
     * scale the agility value into a speed multiplier.
     *
     * @return {number} The calculated walking speed.
     */
    getWalkSpeed() {
        return (1 + EasingsService.easeInOutQuad(this.agility / 100)) * Character.SPEED_MULTIPLIER;
    }


    takeHit(impact: number): number {
        let actualDamage = 0;
        if (impact > this.armor) {
            actualDamage = impact - this.armor;
            this.health -= actualDamage;
            Logger.getInstance().info(`${this.constructor.name} took ${actualDamage} damage`);
        }
        return actualDamage;
    }


    /**
     * Calculate next state and perform the action.
     * This is called at each screen refresh.
     * TODO: this should be called with an independent frequency from screen refresh, to free cpu resources
     * @param engine
     */
    updateState(engine: Engine): void {
        this.updateStateVariables(engine);
        StateManager.updateState(engine, this);
        // this.performAction(this.currentState, engine);
    }


    updateStateVariables(engine: Engine) {
        // update player position
        const player = engine.currentScene.actors.find(a => a.name === 'player');
        if (player) {
            this.playerPosition = player.pos;
            // update player nearby flag
            this.playerDistance = Vector.distance(this.actor.pos, player.pos);
            this.isPlayerNearby = this.playerDistance < Config.game.closePlayerDistance;
        }
        // TODO update player attackable flag
    }
}
