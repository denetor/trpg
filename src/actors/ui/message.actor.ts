import { Actor, Color, Engine, Font, FontUnit, Label, vec, Vector } from "excalibur";

/**
 * Actor that displays a message at the top center of the screen.
 * The message can be configured to disappear after a certain time or on click.
 */
export class MessageActor extends Actor {
    // default values
    static MARGIN = 8;
    static FONT_SIZE = 6;
    static FONT_COLOR = Color.White;
    // properties
    private label: Label;
    private autoHideTimeout: NodeJS.Timeout | null = null;

    /**
     * Creates a new MessageActor
     * @param options Configuration options for the message
     */
    constructor(options: {
        engine: Engine,
        text: string,
        autoHideAfterMs?: number,
        hideOnClick?: boolean,
        fontSize?: number,
        fontColor?: Color
    }) {
        super({
            name: 'message',
            z: 200,
            width: options.engine.drawWidth - MessageActor.MARGIN * 2,
            height: (options.fontSize || MessageActor.FONT_SIZE)*MessageActor.countLines(options.text) + MessageActor.MARGIN * 2,
            color: Color.fromHex('#00000077'),
        });
        // console.log({name: this.name, width: options.engine.drawWidth - MessageActor.MARGIN * 2, height: (options.fontSize || 8) + MessageActor.MARGIN * 2})

        // Create the label with the message text
        this.label = new Label({
            text: options.text,
            font: new Font({
                family: 'monospace',
                size: options.fontSize || MessageActor.FONT_SIZE,
                unit: FontUnit.Px,
                color: options.fontColor || MessageActor.FONT_COLOR,
            })
        });

        // Add the label as a child actor
        this.addChild(this.label);

        // // Set up auto-hide if specified
        if (options.autoHideAfterMs) {
            this.autoHideTimeout = setTimeout(() => {
                console.log('Auto-hiding message');
                this.kill();
            }, options.autoHideAfterMs);
        }

        // Set up click-to-hide if specified
        if (options.hideOnClick) {
            this.on('pointerdown', () => {
                console.log('Click to hide message');
                this.kill();
            });
        }
    }

    /**
     * Initialize the actor and position it at the top center of the screen
     */
    onInitialize(engine: Engine) {
        this.anchor.setTo(0, 0);
        this.label.pos = vec(MessageActor.MARGIN, MessageActor.MARGIN);
        this.label.anchor = vec(0, 0);
    }



    /**
     * Clean up when the actor is killed
     */
    onKill() {
        if (this.autoHideTimeout) {
            clearTimeout(this.autoHideTimeout);
            this.autoHideTimeout = null;
        }
    }


    static countLines(text: string) {
        return text.split('\n').length;
    }
}