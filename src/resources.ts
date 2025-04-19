import { ImageFiltering, ImageSource, Loadable, Loader } from "excalibur";
import { TiledResource } from '@excaliburjs/plugin-tiled';
import darkMageSpriteSheetPath from '../img/actors/player/mage-dark.png';
import {PlayerActorFactory} from "./factories/playerActorFactory";



export const Resources = {
    darkMageSpriteSheet: new ImageSource(darkMageSpriteSheetPath),
    TiledMap: new TiledResource('./res/first-level.tmx', {
        entityClassNameFactories: {
            playeractor: PlayerActorFactory.create,
        },
    })
}

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}