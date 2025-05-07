import {Character} from "../character.model";
import {States} from "../states.enum";

export class Slime extends Character {
    constructor() {
        super();
        this.intelligence = 1;
        this.agility = 1;
        this.strength = 1;
        this.health = 50;
        this.maxHealth = this.health;
        this.armor = 0;
        this.availableStates = [States.IDLE, States.FIGHT_PLAYER, States.CHASE_PLAYER, States.FLEE_PLAYER];
    }
}
