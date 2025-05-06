import {Color, Engine, Font, FontUnit, Label, Timer, vec, Vector} from "excalibur";
import {Config} from "../../config";


/**
 * Label appearing on top of an actor when it receives damage
 */
export class DamageLabel extends Label {


    constructor(options: {damage: number, pos: Vector}) {
        super({
            text: `${options.damage}`,
            pos: options.pos,
            font: Config.font.ephemeralMessage,
        });
    }


    onInitialize(engine: Engine) {
        this.vel = vec(0, -15);
        this.z = 200;
        engine.clock.schedule(() => {
            this.kill();
        }, 1500);
    }




}
