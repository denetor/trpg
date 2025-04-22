import {Item} from "../item.model";

export class Crate extends Item {
    constructor() {
        super({maxHealth: 20, damageable: true, armor: 2});
    }
}
