import {EasingsService} from "../services/easings.service";

export class Character {
    // main stats
    strength: number;
    /**
     * Phisical agility: determines walking speed and agility-related tasks success rate
     */
    agility: number;
    intelligence: number;

    // current status
    health: number;

    constructor() {
        this.health = 100;
        this.strength = 40;
        this.agility = 40;
        this.intelligence = 40;
    }

    getWalkSpeed() {
        return (1 + EasingsService.easeInOutQuad(this.agility / 100)) * 20;
    }
}