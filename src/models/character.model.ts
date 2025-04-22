import {EasingsService} from "../services/easings.service";
import {Hittable} from "./hittable.interface";


export interface CharacterCreateOptions {
    strength?: number;
    agility?: number;
    intelligence?: number;
    armor?: number;
    maxHealth?: number;
    health?: number;
}


export class Character implements Hittable {
    // main stats
    strength: number;
    agility: number;
    intelligence: number;
    armor: number;
    maxHealth: number;

    // current status
    health: number;


    constructor(options?: CharacterCreateOptions) {
        this.strength = options?.strength ?? 40;
        this.agility = options?.agility ?? 40;
        this.intelligence = options?.intelligence ?? 40;
        this.armor = options?.armor ?? 0;
        this.maxHealth = options?.maxHealth ?? 100;
        this.health = options?.health ?? 100;
    }


    getWalkSpeed() {
        return (1 + EasingsService.easeInOutQuad(this.agility / 100)) * 20;
    }


    takeHit(damage: number): number {
        let damageTaken = 0;
        if (damage > this.armor) {
            damageTaken = damage - this.armor;
            this.health -= damageTaken;
        }
        return damageTaken;
    }
}
