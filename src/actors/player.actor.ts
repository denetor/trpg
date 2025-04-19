import {Actor, Animation, Engine, SpriteSheet, vec} from "excalibur";
import {Player} from "../models/player.model";
import * as ex from "excalibur";
import {Resources} from "../resources";

export class PlayerActor extends Actor {
    model: Player;
    state: string;
    direction: string;

    constructor(pos: ex.Vector) {
        super({
            pos,
            width: 16,
            height: 16,
            collisionType: ex.CollisionType.Active
        });
        this.model = new Player();
        this.state = 'idle';
        this.direction = 'S';
        this.z = 100;
    }


    onInitialize(engine: Engine) {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.darkMageSpriteSheet,
            grid: {
                rows: 4,
                columns: 3,
                spriteWidth: 48,
                spriteHeight: 64,
            },
        });

        // prepare animations: idle
        this.graphics.add('idleN', Animation.fromSpriteSheetCoordinates({
            spriteSheet: spriteSheet,
            durationPerFrame: 1000,
            frameCoordinates: [{ x: 1, y: 0 }],
        }));
        this.graphics.add('idleE', Animation.fromSpriteSheetCoordinates({
            spriteSheet: spriteSheet,
            durationPerFrame: 1000,
            frameCoordinates: [{ x: 1, y: 1 }],
        }));
        this.graphics.add('idleS', Animation.fromSpriteSheetCoordinates({
            spriteSheet: spriteSheet,
            durationPerFrame: 1000,
            frameCoordinates: [{ x: 1, y: 2 }],
        }));
        this.graphics.add('idleW', Animation.fromSpriteSheetCoordinates({
            spriteSheet: spriteSheet,
            durationPerFrame: 1000,
            frameCoordinates: [{ x: 1, y: 3 }],
        }));
        // walk
        this.graphics.add('walkN', Animation.fromSpriteSheetCoordinates({
            spriteSheet: spriteSheet,
            durationPerFrame: 125,
            frameCoordinates: [{ x: 0, y: 0 },{ x: 1, y: 0 },{ x: 2, y: 0 },{ x: 1, y: 0 }],
        }));
        this.graphics.add('walkE', Animation.fromSpriteSheetCoordinates({
            spriteSheet: spriteSheet,
            durationPerFrame: 125,
            frameCoordinates: [{ x: 0, y: 1 },{ x: 1, y: 1 },{ x: 2, y: 1 },{ x: 1, y: 1 }],
        }));
        this.graphics.add('walkS', Animation.fromSpriteSheetCoordinates({
            spriteSheet: spriteSheet,
            durationPerFrame: 125,
            frameCoordinates: [{ x: 0, y: 2 },{ x: 1, y: 2 },{ x: 2, y: 2 },{ x: 1, y: 2 }],
        }));
        this.graphics.add('walkW', Animation.fromSpriteSheetCoordinates({
            spriteSheet: spriteSheet,
            durationPerFrame: 125,
            frameCoordinates: [{ x: 0, y: 3 },{ x: 1, y: 3 },{ x: 2, y: 3 },{ x: 1, y: 3 }],
        }));
    }


    onPreUpdate(engine: Engine, elapsed: number) {
        // detect keypresses to manage movement
        // temporary: to be centralized
        if (engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
            this.state = 'walk';
            this.direction = 'E';
            this.vel = ex.vec(this.model.getWalkSpeed(), this.vel.y);
        } else if (engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
            this.state = 'walk';
            this.direction = 'W';
            this.vel = ex.vec(-this.model.getWalkSpeed(), this.vel.y);
        } else {
            this.vel = ex.vec(0, this.vel.y);
        }
        if (engine.input.keyboard.isHeld(ex.Keys.ArrowUp)) {
            this.state = 'walk';
            this.direction = 'N';
            this.vel = ex.vec(this.vel.x, -this.model.getWalkSpeed());
        } else if (engine.input.keyboard.isHeld(ex.Keys.ArrowDown)) {
            this.state = 'walk';
            this.direction = 'S';
            this.vel = ex.vec(this.vel.x, this.model.getWalkSpeed());
        } else {
            this.vel = ex.vec(this.vel.x, 0);
        }
        if (!engine.input.keyboard.isHeld(ex.Keys.ArrowDown) && !engine.input.keyboard.isHeld(ex.Keys.ArrowUp) &&
            !engine.input.keyboard.isHeld(ex.Keys.ArrowLeft) && !engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
            this.state = 'idle';
            this.vel = ex.vec(0, 0);
        }

        // apply animation basing on state
        if (this.state === 'idle') {
            switch (this.direction) {
                case 'N':
                    this.graphics.use('idleN');
                    break;
                case 'E':
                    this.graphics.use('idleE');
                    break;
                case 'S':
                    this.graphics.use('idleS');
                    break;
                case 'W':
                    this.graphics.use('idleW');
                    break;
            }
        }
        else if (this.state === 'walk') {
            switch (this.direction) {
                case 'N':
                    this.graphics.use('walkN');
                    break;
                case 'E':
                    this.graphics.use('walkE');
                    break;
                case 'S':
                    this.graphics.use('walkS');
                    break;
                case 'W':
                    this.graphics.use('walkW');
                    break;
            }
        }
    }
}