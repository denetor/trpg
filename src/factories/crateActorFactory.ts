import {FactoryProps} from "@excaliburjs/plugin-tiled";
import {CrateActor} from "../actors/crate.actor";

export class CrateActorFactory {


    static create(props: FactoryProps) {
        const actor = new CrateActor(props.worldPos);
        actor.z = 100;
        return actor;
    }
}