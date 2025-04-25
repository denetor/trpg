import {Actor, Engine, Logger, Scene} from "excalibur";
import {Resources} from "../resources";
import {PlayerActor} from "../actors/player.actor";

export class DevScene extends Scene {
    player: PlayerActor;


    constructor() {
        super();
        this.player = undefined as any;
    }



    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        Resources.TiledMap.addToScene(this);
        this.player = this.actors.find(a => a.name === 'player') as PlayerActor;
        if (this.player) {
            this.camera.strategy.elasticToActor(this.player, 0.5, 0.9);
        }

        // manage mouse click
        engine.input.pointers.on('down', function (evt) {
            Logger.getInstance().info(`Clicked at position ${evt.coordinates.worldPos.x}, ${evt.coordinates.worldPos.y}`);
            console.log({evt});
            // TODO get npc or object clicked (if any)
            // TODO if no object or npc, go (straight) to position
            // TODO if hostile npc, "attack" by default
            // TODO if non-hostile npc, "talk" by default
            // TODO if object, "use" by default
        });
    }

}