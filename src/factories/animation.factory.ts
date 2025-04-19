import {Animation, SpriteSheet, vec, Vector} from "excalibur";

export class AnimationFactory {

    /**
     * Create an animation given a spritesheet, scaling the frames to the target size
     *
     * @param spriteSheet
     * @param targetSize in pixels
     * @param frames
     */
    static createScaled(spriteSheet: SpriteSheet, targetSize: Vector, frames: {x: number, y: number, duration: number}[]): Animation {
        const a = new Animation({
            scale: vec(1, 1),
            frames: frames.map((f) => {
                const s = spriteSheet.getSprite(f.x, f.y);
                s.scale = vec(targetSize.x / s.width, targetSize.y / s.height);
                return {
                    duration: f.duration,
                    graphic: s,
                }
            }),
        });
        return a;
    }
}