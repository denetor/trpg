import {Character} from "./character.model";
import {Weapon} from "./weapon.model";
import {Sword} from "./weapons/sword.model";

export class Player extends Character {
    mainWeapon: Weapon;

    constructor() {
        super();
        this.mainWeapon = new Sword();
    }
}