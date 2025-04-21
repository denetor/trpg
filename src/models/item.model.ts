/**
 * Base class fort any item
 */
export class Item {
    damageable: boolean;
    health: number;

    constructor() {
        this.damageable = false;
        this.health = 100;
    }
}