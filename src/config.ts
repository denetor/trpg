import {Color, Font, FontUnit, vec} from "excalibur";

export const Config = {
    font: {
        ephemeralMessage: new Font({
            family: 'monospace',
            size: 7,
            bold: true,
            unit: FontUnit.Px,
            color: Color.Green,
            shadow: {
                blur: 1,
                offset: vec(2, 2),
                color: Color.Black,
            },
        })
    },
    game: {
        // run AI routines only on actors within this radius from player
        runAiRadius: 350,
        // under this distance, consider the player close
        nearbyPlayerDistance: 100,
        // if not specified else, the default distance at wich the player is attachable by an NPC
        defaultAttackablePlayerDistance: 25,
        // probability that at a state update, the NPC will start/stop wandering instead of idling
        wanderProbability: 0.1,
        // radius where the NPC should stay when wandering randomly
        wanderingRadius: 50,
        // probability that an NPC will stop fleeing after the player is no more nearby
        stopFleeingProbability: 0.2,
        // probability that an NPC will stop chasing after the player is no more nearby
        stopChasingProbability: 0.2,
    }
}
