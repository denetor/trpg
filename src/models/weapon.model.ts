import {Item} from "./item.model";

/**
 * Base class for any weapon
 */
export abstract class Weapon extends Item {

    protected constructor() {
        super();
    }

    abstract getDamage(): number;
}