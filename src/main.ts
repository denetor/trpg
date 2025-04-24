import * as ex from 'excalibur';
import { Resources, loader } from './resources';

export const game = new ex.Engine({
    canvasElementId: 'game',
    width: 800,
    height: 600,
    // displayMode: ex.DisplayMode.FitScreen,
    displayMode: ex.DisplayMode.FillScreen,
    pixelArt: true,
    suppressPlayButton: true,
});

game.start(loader).then(() => {
    Resources.TiledMap.addToScene(game.currentScene);
});
