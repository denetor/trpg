import {Actor, Color, Engine, Font, FontUnit, Label, Timer, vec, Vector} from "excalibur";


/**
 * Label appearing at a certain world position, then disappears in a few seconds
 */
export class EphemeralMessage extends Label {
    private autohideTimer: Timer = undefined as any;


    constructor(options: {message: string, actor: Actor}) {
        super({
            text: `${options.message}`,
            pos: options.actor.pos.add(vec(- options.actor.width / 2, - options.actor.height / 2 - 10)),
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
        this.z = 200;
        this.autohideTimer = new Timer({
            interval: 2000,
            repeats: false,
            action: () => {
                this.kill();
            }
        });
        engine.currentScene.add(this.autohideTimer);
        this.autohideTimer.start();
    }




}