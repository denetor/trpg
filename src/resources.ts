import {ImageSource, Loader} from "excalibur";
import { TiledResource } from '@excaliburjs/plugin-tiled';
import darkMageSpriteSheetPath from '../img/actors/player/mage-dark.png';
import solariaSpriteSheetPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Tilesets/Solaria Demo Update 01.png';
import {PlayerActorFactory} from "./factories/playerActorFactory";
import {CrateActorFactory} from "./factories/crateActorFactory";



export const Resources = {
    solariaSpriteSheetImage: new ImageSource(solariaSpriteSheetPath),
    darkMageSpriteSheet: new ImageSource(darkMageSpriteSheetPath),
    TiledMap: new TiledResource('./res/first-level.tmx', {
        entityClassNameFactories: {
            playeractor: PlayerActorFactory.create,
            crate: CrateActorFactory.create,
        },
    })
}

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}