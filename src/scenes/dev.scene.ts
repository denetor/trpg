import {Actor, Engine, Logger, Scene} from "excalibur";
import {Resources} from "../resources";
import {PlayerActor} from "../actors/player.actor";
import {status} from "../main";
import {ActorMenu} from "../actors/ui/actor-menu";

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
        engine.input.pointers.on('down', (evt) => {
            Logger.getInstance().info(`Clicked at position ${evt.coordinates.worldPos.x}, ${evt.coordinates.worldPos.y}`);
            // if actor is clicked, display actor menu
            if (status && status.selectedActor && status.selectedActor.actor && status.selectedActor.selectedTs && Date.now()-1000 < status.selectedActor.selectedTs) {
                const clickedActor = status.selectedActor.actor;
                const menu = new ActorMenu(clickedActor, evt.coordinates.screenPos);
                this.add(menu);
                Logger.getInstance().info('Display actor menu')
            }
            // TODO if no object or npc, go (straight) to position
            // TODO if hostile npc, "attack" by default
            // TODO if non-hostile npc, "talk" by default
            // TODO if object, "use" by default
        });
    }

}