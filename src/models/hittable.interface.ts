/**
 * Represents an object that can take a hit and handle damage.
 */
export interface Hittable {
    takeHit(damage: number): number;
}
