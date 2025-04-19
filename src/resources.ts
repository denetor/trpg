import { ImageFiltering, ImageSource, Loadable, Loader } from "excalibur";
import { TiledResource } from '@excaliburjs/plugin-tiled';
import darkMageSpriteSheetPath from '../img/actors/player/mage-dark.png';
import {PlayerActor} from "./actors/player.actor";



export const Resources = {
    darkMageSpriteSheet: new ImageSource(darkMageSpriteSheetPath),
    TiledMap: new TiledResource('./res/first-level.tmx', {
        entityClassNameFactories: {
            playeractor: (props) => {
                const player = new PlayerActor(props.worldPos);
                player.z = 100;
                return player;
            }
        },
    })
}

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}