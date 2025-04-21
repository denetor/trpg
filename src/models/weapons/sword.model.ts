import {Weapon} from "../weapon.model";

export class Sword extends Weapon {
    constructor() {
        super();
    }

    getDamage() {
        return Math.floor(Math.random() * 6 + Math.random() * 6);
    }
}