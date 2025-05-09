import {EasingsService} from "../services/easings.service";
import {Hittable} from "./hittable.interface";
import {Logger} from "excalibur";


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
}
