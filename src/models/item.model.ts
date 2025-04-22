import {Hittable} from "./hittable.interface";


/**
 * Represents the options available for creating an item.
 *
 * This interface allows specifying optional properties that define
 * the characteristics of the item, such as whether it is damageable
 * and attributes like health and armor.
 *
 * Properties:
 * - `damageable`: A boolean indicating if the item can take damage.
 * - `maxHealth`: A number representing the item's health value.
 * - `health`: A number representing the item's current health value.
 * - `armor`: A number representing the item's armor value.
 */
export interface ItemCreateOptions {
    damageable?: boolean;
    maxHealth?: number;
    health?: number;
    armor?: number;
}


/**
 * Base class fort any item
 */
export class Item implements Hittable {
    damageable: boolean;
    maxHealth: number;
    health: number;
    armor: number;

    constructor(options?: ItemCreateOptions) {
        this.damageable = options?.damageable ?? false;
        this.maxHealth = options?.maxHealth ?? 100;
        this.health = options?.health ?? options?.maxHealth ?? 100;
        this.armor = options?.armor ?? 0;
    }


    takeHit(impact: number): number {
        let actualDamage = 0;
        if (this.damageable && impact > this.armor) {
            actualDamage = impact - this.armor;
            this.health -= actualDamage;
            console.log(`${this.constructor.name} took ${actualDamage} damage`);
        }
        return actualDamage;
    }
}
