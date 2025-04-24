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
        this.health = options?.health ?? options?.maxHealth ?? 100;
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
        return (1 + EasingsService.easeInOutQuad(this.agility / 100)) * 40;
    }


    takeHit(impact: number): number {
        let actualDamage = 0;
        if (impact > this.armor) {
            actualDamage = impact - this.armor;
            this.health -= actualDamage;
            console.log(`${this.constructor.name} took ${actualDamage} damage`);
        }
        return actualDamage;
    }
}
