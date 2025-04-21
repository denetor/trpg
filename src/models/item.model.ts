/**
 * Base class fort any item
 */
export class Item {
    damageable: boolean;
    health: number;
    armor: number;

    constructor() {
        this.damageable = false;
        this.health = 100;
        this.armor = 0;
    }


    takeHit(damage: number): number {
        let damageTaken = 0;
        if (this.damageable && damage > this.armor) {
            console.log(`${this.constructor.name} took ${damage} damage`);
            damageTaken = damage - this.armor;
            this.health -= damageTaken;
        }
        return damageTaken;
    }
}