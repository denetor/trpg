import {Animation, AnimationStrategy, SpriteSheet, vec, Vector} from "excalibur";


/**
 * Represents a request to create a scaled animation from a sprite sheet.
 *
 * This interface is used to define the parameters required to generate an
 * animation that scales based on the specified target size and frame
 * configuration.
 *
 * Properties:
 * - `spriteSheet`: The sprite sheet to be used for the animation. It contains
 *   all the frames needed for the animation.
 * - `targetSize`: The target size for the scaled animation. Defines the width
 *   and height of the output animation.
 * - `frames`: An array of frame configurations, where each frame is defined by
 *   its x and y coordinates on the sprite sheet and a duration for how long
 *   the frame should be displayed.
 * - `strategy`: The optional animation strategy to be applied when handling
 *   scaling or other animation-specific behaviors. Defaults to AnimationStrategy.Loop.
 */
export interface CreateScaledRequest {
    spriteSheet: SpriteSheet;
    targetSize: Vector;
    frames: {x: number, y: number, duration: number}[];
    strategy?: AnimationStrategy;
}


export class AnimationFactory {

    /**
     * Creates a scaled animation based on the provided properties.
     *
     * @param {CreateScaledRequest} properties - The properties used to create the scaled animation, including frames, sprite sheet, and target size.
     * @return {Animation} A new animation instance with scaled sprites and associated frame durations.
     */
    static createScaled(properties: CreateScaledRequest): Animation {
        return new Animation({
            scale: vec(1, 1),
            frames: properties.frames.map((f) => {
                const s = properties.spriteSheet.getSprite(f.x, f.y);
                s.scale = vec(properties.targetSize.x / s.width, properties.targetSize.y / s.height);
                return {
                    duration: f.duration,
                    graphic: s,
                }
            }),
            strategy: properties.strategy ?? AnimationStrategy.Loop,
        });
    }
}