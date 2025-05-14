import {Actor, Collider, CollisionContact, Color, Engine, Logger, Side, Vector} from "excalibur";
import {PlayerActor} from "../player.actor";


/**
 * Base class for any missile weapon ammo
 */
export class MissileActor extends Actor {
    // destination of the shot
    destination: Vector;
    // damage that the missile will deal
    damage: number;


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
        this.damage = params?.damage ?? 1;
    }


    /**
     * Initializes the actor and sets its behavior upon being added to the scene.
     *
     * @param {Engine} engine - The game engine instance used to set up the actor.
     * @return {void} This method does not return a value.
     */
    onInitialize(engine: Engine): void {
        Logger.getInstance().info(`Firing missile to ${this.destination.x}, ${this.destination.y}`);
        super.onInitialize(engine);
        if (this.destination && this.destination.x !== 0 && this.destination.y !== 0) {
            this.actions.moveTo(this.destination, 100).die();
        } else {
            // something went wrong
            this.kill();
        }
    }


    /**
     * Handles logic when a collision begins between two colliders.
     * If hits the player, consider him hit
     *
     * @param {Collider} self - The collider instance that triggered the collision.
     * @param {Collider} other - The collider instance that was collided with.
     * @param {Side} side - The side of the collision relative to the `self` collider.
     * @param {CollisionContact} contact - Detailed contact information of the collision.
     * @return {void} This method does not return a value.
     */
    onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact) {
        super.onCollisionStart(self, other, side, contact);
        Logger.getInstance().info(`${this.name} hit ${other.owner.name}`);
        if (other.owner.name === 'player' && (other.owner as PlayerActor)?.takeHit) {
            (other.owner as PlayerActor).takeHit(this);
        }
    }
}
