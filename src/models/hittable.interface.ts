/**
 * Represents an object that can take a hit and handle damage.
 */
export interface Hittable {

    /**
     * Decreases the current health of an entity based on the impact coming from the weapon,
     * and returns the inflicted damage (impact subtracted armor or magic protections).
     *
     * @param {number} impact - The amount of damage coming from the hit.
     * @return {number} The amount of damage actually inflicted, considering armors
     */
    takeHit(impact: number): number;
}
