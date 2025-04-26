import {Actor, Logger, SpriteSheet, Timer, vec, Vector} from "excalibur";
import {Resources} from "../../resources";
import {AnimationFactory} from "../../factories/animation.factory";

export class ActorMenu extends Actor {
    private autohideTimer: Timer;
    private readonly actor: Actor;


    constructor(actor: Actor, screenPos: Vector) {
        super({pos: actor.scene?.engine.screenToWorldCoordinates(vec(screenPos.x+16, screenPos.y)) });
        this.autohideTimer = null as any;
        this.actor = actor;
    }


    onInitialize() {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.miscSpriteSheet,
            grid: {
                rows: 1,
                columns: 1,
                spriteWidth: 48,
                spriteHeight: 16,
            },
        });
        this.anchor.setTo(0, 0);
        this.graphics.add('default', AnimationFactory.createScaled({spriteSheet, targetSize: vec(48,16), frames: [{ x: 0, y: 0, duration: 1000 }]}));
        this.graphics.use('default');
        this.z = 999;

        this.autohideTimer = new Timer({
            interval: 3000,
            repeats: false,
            action: () => {
                this.kill();
            }
        });
        if (this.actor && this.actor.scene) {
            this.actor.scene.engine.addTimer(this.autohideTimer);
            this.autohideTimer.start();
        }
    }
}