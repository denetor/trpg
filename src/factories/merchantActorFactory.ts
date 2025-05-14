import {FactoryProps} from "@excaliburjs/plugin-tiled";
import {MerchantActor} from "../actors/npc/merchant.actor";

export class MerchantActorFactory {

    static create(props: FactoryProps) {
        const a = new MerchantActor(props.worldPos);
        a.z = 100;
        return a;
    }
}
