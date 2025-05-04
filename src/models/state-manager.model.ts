import {Actor, Engine} from "excalibur";
import {Character} from "./character.model";
import {States} from "./states.enum";

export class StateManager {


    /**
     * Updates (if necessary) the state of a character.
     *
     * @param engine
     * @param model
     */
    static updateState(engine: Engine, model: Character): void {
        switch (model.currentState) {
            case States.IDLE:
                StateManager.updateIdleState(engine, model);
                break;
        }
    }


    /**
     * Update the state of an NPC in idle state
     * @param engine
     * @param model
     */
    static updateIdleState(engine: Engine, model: Character): void {
        // TODO if player is nearby, FLEE is available and health is low, change to FLEE
        // TODO if player is nearby, CHASE is available, player is over attack distance, change to CHASE
        if (model.isPlayerNearby /* TODO terminare condizioni */) {
            model.currentState = States.CHASE_PLAYER;
        }
        // TODO if player is below attack distance, FIGHT is available, change to FIGHT
        // TODO if WANDER is available, and random test is passed, change to WANDER
        // else remain in current state
    }


    static updateFleePlayerState(engine: Engine, model: Character): void {
        // TODO if player is not nearby, if a random test is passed, change to IDLE
        // else remain in current state
    }


    static updateChasePlayerState(engine: Engine, model: Character): void {
        // TODO if player is nearby, FLEE is available and health is low, change to FLEE
        // TODO if player is below attack distance, FIGHT is available, change to FIGHT
        // else remain in current state
    }


    static updateFightPlayerState(engine: Engine, model: Character): void {
        // TODO if player is nearby, FLEE is available and health is low, change to FLEE
        // TODO if player is nearby, CHASE is available, player is over attack distance, change to CHASE
        // TODO if player is not nearby, change to IDLE
        // else remain in current state
    }


    static updateWanderState(engine: Engine, model: Character): void {
        // TODO if player is not nearby, and random test is passed, change to IDLE
        // else remain in current state
    }



}
