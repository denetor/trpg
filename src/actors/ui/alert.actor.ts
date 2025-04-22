import {Actor, Color, Font, FontUnit, GraphicsGroup, Label, Rectangle, Text, vec} from "excalibur";

export interface AlertActorCreateOptions {
    text?: string;
    screenWidth: number;
    screenHeight: number;
}

export class AlertActor extends Actor {
    screenWidth: number;
    screenHeight: number;
    text: string;


    constructor(options: AlertActorCreateOptions) {
        super();
        this.text = options?.text ?? '';
        this.screenWidth = options.screenWidth;
        this.screenHeight = options.screenHeight;
    }


    onInitialize() {
        const bg = new Rectangle({
            width: 100,
            height: 100,
            color: Color.Black,
        });
        this.graphics.use(bg);

        const label = new Label({
            text: this.text,
            font: new Font({
                family: 'monospace',
                size: 7,
                unit: FontUnit.Px,
                color: Color.Yellow,
            }),
        });
        this.addChild(label);
        //this.pos = vec(this.screenWidth/2 - bg.width/2, this.screenHeight/2 - bg.height/2);
        this.pos = vec(this.screenWidth/2, this.screenHeight/2);
        this.z = 999;
    }
}
