import {Color, Engine, Font, FontUnit, Label, vec, Vector} from "excalibur";


/**
 * Label appearing on top of an actor when it receives damage
 */
export class DamageLabel extends Label {



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
        this.vel = vec(0, -15);
    }


    onInitialize(engine: Engine) {
        this.z = 200;
        setTimeout(() => {
            this.kill();
        }, 1500);
    }




}