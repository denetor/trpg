import {Color, Engine, Font, FontUnit, Label, Rectangle, ScreenElement, Timer, vec} from "excalibur";

export class ScreenMessage extends  ScreenElement {
    private options: any;
    // default values
    static MARGIN = 16;
    static FONT_SIZE = 16;
    static FONT_COLOR = Color.White;
    // properties
    private label: Label;
    private autohideTimer: Timer;


    constructor(options: {
        engine: Engine,
        text: string,
        autoHideAfterMs?: number,
        hideOnClick?: boolean,
        fontSize?: number,
        fontColor?: Color
    }) {
        super();
        this.options = options;
        this.label = null as any;
        this.autohideTimer = null as any;
    }


    onInitialize() {
        const bg = new Rectangle({
            width: this.options.engine.canvas.getBoundingClientRect().width - ScreenMessage.MARGIN * 2,
            height: (this.options.fontSize || ScreenMessage.FONT_SIZE)*ScreenMessage.countLines(this.options.text) + ScreenMessage.MARGIN * 2,
            color: Color.fromHex('#00000077'),
        });
        this.anchor.setTo(0, 0);
        this.graphics.add(bg);
        this.pos = vec(ScreenMessage.MARGIN, ScreenMessage.MARGIN);
        this.z = 999;

        // Create the label with the message text
        this.label = new Label({
            text: this.options.text,
            font: new Font({
                family: 'monospace',
                size: this.options.fontSize || ScreenMessage.FONT_SIZE,
                unit: FontUnit.Px,
                color: this.options.fontColor || ScreenMessage.FONT_COLOR,
            })
        });
        this.label.pos = vec(ScreenMessage.MARGIN, ScreenMessage.MARGIN);
        this.label.anchor = vec(0, 0);


        // TODO make hide on click work on ScreenMessage
        // hide on click, if requested
        // if (this.options.hideOnClick) {
        //     this.on('pointerdown', () => {
        //         console.log('Click to hide message');
        //         this.kill();
        //     });
        // }

        // autohide timer, if requested
        if (this.options.autoHideAfterMs) {
            this.autohideTimer = new Timer({
                interval: this.options.autoHideAfterMs,
                repeats: false,
                action: () => {
                    this.kill();
                }
            });
            this.options.engine.currentScene.add(this.autohideTimer);
            this.autohideTimer.start();
        }

        this.addChild(this.label);
    }




    static countLines(text: string) {
        return text.split('\n').length;
    }

}