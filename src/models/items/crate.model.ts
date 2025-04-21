import {Item} from "../item.model";

export class Crate extends Item {
    constructor() {
        super();
        this.health = 20;
        this.damageable = false;
        this.armor = 2;
    }
}