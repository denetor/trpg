/**
 * Interface for actors that can "talk"
 */
export interface Talkable {

    /**
     * The actor says an ephemeral text. This is intended as the text visible over the actor,
     * fading away in a few seconds.
     *
     * @param message {string} The message to be displayed.
     */
    say(message: string): void;
}