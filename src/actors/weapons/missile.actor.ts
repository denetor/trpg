import {Actor, Color, Logger, Vector} from "excalibur";


/**
 * Base class for any missile weapon ammo
 */
export class MissileActor extends Actor {
    destination: Vector = Vector.Zero;


    constructor(params: any) {
        super({
            x: params?.x ?? 0,
            y: params?.y ?? 0,
            name: 'missile',
            radius: 2,
            color: Color.Yellow,
            z: 900,
        });
        this.destination = params?.destination ?? Vector.Zero;
    }


    onInitialize(engine: ex.Engine) {
        Logger.getInstance().info(`Firing missile to ${this.destination.x}, ${this.destination.y}`);
        super.onInitialize(engine);
        if (this.destination && this.destination.x !== 0 && this.destination.y !== 0) {
            this.actions.moveTo(this.destination, 100).die();
        } else {
            // something went wrong
            this.kill();
        }
    }
}