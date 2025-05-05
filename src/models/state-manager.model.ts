import {Actor, Engine} from "excalibur";
import {Character} from "./character.model";
import {States} from "./states.enum";
import {Config} from "../config";

export class StateManager {


    /**
     * Updates (if necessary) the state of a character.
     *
     * @param engine
     * @param model
     */
    static updateState(engine: Engine, model: Character): void {
        console.log('updateState()');
        const previousState = model.currentState;
        switch (model.currentState) {
            case States.IDLE:
                StateManager.updateIdleState(engine, model);
                break;
            case States.FLEE_PLAYER:
                StateManager.updateFleePlayerState(engine, model);
                break;
            case States.CHASE_PLAYER:
                StateManager.updateChasePlayerState(engine, model);
                break;
            case States.FIGHT_PLAYER:
                StateManager.updateFightPlayerState(engine, model);
                break;
            case States.WANDER:
                StateManager.updateWanderState(engine, model);
                break;
        }
        if (model.currentState !== previousState) {
            if ((model.actor as any)?.say && typeof (model.actor as any).say === 'function') {
                (model.actor as any).say(`${StateManager.getStateName(model.currentState)}`);
            } else {
                console.log(`Actor ${model.constructor.name} switched from ${previousState} to ${model.currentState}`);
            }
        }
    }


    /**
     * Updates the idle state of a character model based on its current conditions and available states.
     *
     * @param {Engine} engine - The game engine instance used for managing game state and interactions.
     * @param {Character} model - The character model whose idle state needs to be updated.
     * @return {void} Does not return a value. The method modifies the `currentState` of the character model directly.
     */
    static updateIdleState(engine: Engine, model: Character): void {
        if (model.isPlayerNearby && StateManager.isStateAvailable(States.FLEE_PLAYER, model) && model.health < Character.FLEE_HEALTH) {
            // if player is nearby, FLEE is available and health is low, change to FLEE
            model.currentState = States.FLEE_PLAYER;
        } else if (model.isPlayerNearby && StateManager.isStateAvailable(States.CHASE_PLAYER, model) && !model.isPlayerAttackable) {
            // if player is nearby, CHASE is available, player is over attack distance, change to CHASE
            model.currentState = States.CHASE_PLAYER;
        } else if (model.isPlayerAttackable && StateManager.isStateAvailable(States.FIGHT_PLAYER, model)) {
            // if player is below attack distance, FIGHT is available, change to FIGHT
            model.currentState = States.FIGHT_PLAYER;
        } else if (StateManager.isStateAvailable(States.WANDER, model) && Math.random() < Config.game.wanderProbability) {
            // if WANDER is available, and random test is passed, change to WANDER
            model.currentState = States.WANDER;
        }
        // else remain in current state
    }


    /**
     * Updates the flee player state for the given character model.
     * Determines if the character should transition to an idle state based on player proximity and a probability threshold.
     *
     * @param {Engine} engine - The game engine instance controlling the game state and logic.
     * @param {Character} model - The character model instance whose flee state needs to be updated.
     * @return {void} This method does not return any value.
     */
    static updateFleePlayerState(engine: Engine, model: Character): void {
        if (!model.isPlayerNearby && StateManager.isStateAvailable(States.IDLE, model) && Math.random() < Config.game.stopFleeingProbability) {
            // if player is not nearby, if a random test is passed, change to IDLE
            model.currentState = States.IDLE;
        }
        // else remain in current state
    }


    /**
     * Updates the chase player state of a character based on its current conditions.
     *
     * Evaluates the character's proximity to the player, health, and available states,
     * and updates the character's state to either FLEE_PLAYER or FIGHT_PLAYER
     * if the conditions are met. If no condition is satisfied, the character remains
     * in its current state.
     *
     * @param {Engine} engine - The game engine managing the game's overall state and logic.
     * @param {Character} model - The character whose state needs to be updated based on proximity
     *                            to the player, health status, and available actions.
     * @return {void} This method does not return a value, it modifies the character's state directly.
     */
    static updateChasePlayerState(engine: Engine, model: Character): void {
        if (model.isPlayerNearby && StateManager.isStateAvailable(States.FLEE_PLAYER, model) && model.health < Character.FLEE_HEALTH) {
            // if player is nearby, FLEE is available and health is low, change to FLEE
            model.currentState = States.FLEE_PLAYER;
        } else if (model.isPlayerAttackable && StateManager.isStateAvailable(States.FIGHT_PLAYER, model)) {
            // if player is below attack distance, FIGHT is available, change to FIGHT
            model.currentState = States.FIGHT_PLAYER;
        } else if (!model.isPlayerNearby && StateManager.isStateAvailable(States.IDLE, model) && Math.random() < Config.game.stopChasingProbability) {
            // if player is not nearby, change to IDLE
            model.currentState = States.IDLE;
        }
        // else remain in current state
    }


    /**
     * Updates the current state of a Character instance based on the proximity and interaction with a player
     * and other game state conditions.
     *
     * @param {Engine} engine - The game engine instance managing the gameplay logic.
     * @param {Character} model - The character model whose state is to be updated.
     * @return {void} This method does not return a value, but directly modifies the state of the provided character model.
     */
    static updateFightPlayerState(engine: Engine, model: Character): void {
        if (model.isPlayerNearby && StateManager.isStateAvailable(States.FLEE_PLAYER, model) && model.health < Character.FLEE_HEALTH) {
            // if player is nearby, FLEE is available and health is low, change to FLEE
            model.currentState = States.FLEE_PLAYER;
        } else if (!model.isPlayerAttackable && model.isPlayerNearby && StateManager.isStateAvailable(States.CHASE_PLAYER, model)) {
            // if player is nearby, CHASE is available, player is over attack distance, change to CHASE
            model.currentState = States.CHASE_PLAYER;
        } else if (!model.isPlayerNearby && StateManager.isStateAvailable(States.IDLE, model) && Math.random() < Config.game.stopChasingProbability) {
            // if player is not nearby, change to IDLE
            model.currentState = States.IDLE;
        }
    }


    /**
     * Updates the wander state of a character based on conditions such as proximity to a player,
     * health, and the availability of certain states. The method evaluates various conditions to
     * determine whether the character should flee, chase, fight, idle, or remain in its current state.
     *
     * @param {Engine} engine - The game engine that controls the game loop and entity logic.
     * @param {Character} model - The character whose state is being updated.
     * @return {void} This method does not return a value but updates the character's current state.
     */
    static updateWanderState(engine: Engine, model: Character): void {
        if (model.isPlayerNearby && StateManager.isStateAvailable(States.FLEE_PLAYER, model) && model.health < Character.FLEE_HEALTH) {
            // if player is nearby, FLEE is available and health is low, change to FLEE
            model.currentState = States.FLEE_PLAYER;
        } else if (model.isPlayerNearby && StateManager.isStateAvailable(States.CHASE_PLAYER, model) && !model.isPlayerAttackable) {
            // if player is nearby, CHASE is available, player is over attack distance, change to CHASE
            model.currentState = States.CHASE_PLAYER;
        } else if (model.isPlayerAttackable && StateManager.isStateAvailable(States.FIGHT_PLAYER, model)) {
            // if player is below attack distance, FIGHT is available, change to FIGHT
            model.currentState = States.FIGHT_PLAYER;
        } else if (StateManager.isStateAvailable(States.IDLE, model) && Math.random() < Config.game.wanderProbability) {
            // if IDLE is available, and random test is passed, change to IDLE
            model.currentState = States.IDLE;
        }
        // else remain in current state
    }


    /**
     * Checks if a specific state is available for the given character model.
     *
     * @param {States} state - The state to check for availability.
     * @param {Character} model - The character model containing available states.
     * @return {boolean} True if the state is available for the character model, otherwise false.
     */
    static isStateAvailable(state: States, model: Character): boolean {
        return model.availableStates.includes(state);
    }


    static getStateName(state: States): string {
        switch (state) {
            case States.IDLE:
                return 'IDLE';
            case States.TALK:
                return 'TALK';
            case States.WANDER:
                return 'WANDER';
            case States.PATROL:
                return 'PATROL';
            case States.FIGHT_PLAYER:
                return 'FIGHT_PLAYER';
            case States.CHASE_PLAYER:
                return 'CHASE_PLAYER';
            case States.FLEE_PLAYER:
                return 'FLEE_PLAYER';
        }
    }



}
