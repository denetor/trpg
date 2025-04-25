import * as ex from 'excalibur';
import { Resources, loader } from './resources';
import {DevScene} from "./scenes/dev.scene";

export const game = new ex.Engine({
    canvasElementId: 'game',
    width: 800,
    height: 600,
    // displayMode: ex.DisplayMode.FitScreen,
    displayMode: ex.DisplayMode.FillScreen,
    pixelArt: true,
    suppressPlayButton: true,
});


export const status = {
    // currently hovered actor
    selectedActor: {
        actor: null,
        selectedAt: null,
    }
}


const scenes = {
    devScene: new DevScene(),
}
game.addScene('dev', scenes.devScene);


game.start(loader).then(() => {
    game.goToScene('dev');
});
