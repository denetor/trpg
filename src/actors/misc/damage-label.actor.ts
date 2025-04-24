import {Color, Engine, Font, FontUnit, Label, Timer, vec, Vector} from "excalibur";


/**
 * Label appearing on top of an actor when it receives damage
 */
export class DamageLabel extends Label {
    private autohideTimer: Timer = undefined as any;


    constructor(options: {damage: number, pos: Vector}) {
        super({
            text: `${options.damage}`,
            pos: options.pos,
            font: new Font({
                family: 'monospace',
                size: 7,
                bold: true,
                unit: FontUnit.Px,
                color: Color.Green,
                shadow: {
                    blur: 1,
                    offset: vec(2, 2),
                    color: Color.Black,
                },
            })
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