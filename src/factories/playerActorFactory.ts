import {FactoryProps} from "@excaliburjs/plugin-tiled";
import {PlayerActor} from "../actors/player.actor";

export class PlayerActorFactory {


    /**
     * Creates a new instance of PlayerActor with the specified properties.
     *
     * @param {FactoryProps} props - The properties to initialize the PlayerActor, including world position.
     * @return {PlayerActor} A new instance of PlayerActor configured with the given properties.
     */
    static create(props: FactoryProps) {
        const player = new PlayerActor(props.worldPos);
        player.z = 100;
        return player;
    }
}