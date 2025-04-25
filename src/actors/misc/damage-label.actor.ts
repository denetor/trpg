import {Color, Engine, Font, FontUnit, Label, Timer, vec, Vector} from "excalibur";
import {Config} from "../../config";


/**
 * Label appearing on top of an actor when it receives damage
 */
export class DamageLabel extends Label {
    private autohideTimer: Timer = undefined as any;


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
        this.autohideTimer = new Timer({
            interval: 1500,
            repeats: false,
            action: () => {
                this.kill();
            }
        });
        engine.currentScene.add(this.autohideTimer);
        this.autohideTimer.start();
    }




}