import {FactoryProps} from "@excaliburjs/plugin-tiled";
import {PlayerActor} from "../actors/player.actor";
import {game} from "../main";
import {SlimeActor} from "../actors/npc/slime.actor";

export class SlimeActorFactory {

    static create(props: FactoryProps) {
        const a = new SlimeActor(props.worldPos);
        a.z = 100;
        return a;
    }
}
