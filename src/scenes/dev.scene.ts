import {Engine, Scene} from "excalibur";
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
    }

}