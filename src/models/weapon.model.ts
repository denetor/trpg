import {Item} from "./item.model";

/**
 * Base class for any weapon
 */
export abstract class Weapon extends Item {

    protected constructor() {
        super();
    }

    /**
     * Returns the damage dealt to the hit entity
     */
    abstract getDamage(): number;
}
