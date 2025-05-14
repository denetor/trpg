import {ImageSource, Loader} from "excalibur";
import { TiledResource } from '@excaliburjs/plugin-tiled';
import darkMageSpriteSheetPath from '../img/actors/player/mage-dark.png';
import solariaSpriteSheetPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Tilesets/Solaria Demo Update 01.png';
import swordSpriteSheetPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Sword 01.png';
import customSpriteSheetPath from '../img/event-sprites.png';
import miscSpriteSheetPath from '../img/misc-sprites.png';
import slimeSpriteSheetPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/RPG Maker/characters/Monster.png';
import {PlayerActorFactory} from "./factories/playerActorFactory";
import {CrateActorFactory} from "./factories/crateActorFactory";
import {SlimeActorFactory} from "./factories/slimeActorFactory";
import {MerchantActorFactory} from "./factories/merchantActorFactory";



export const Resources = {
    solariaSpriteSheetImage: new ImageSource(solariaSpriteSheetPath),
    darkMageSpriteSheet: new ImageSource(darkMageSpriteSheetPath),
    swordSpriteSheet: new ImageSource(swordSpriteSheetPath),
    customSpriteSheet: new ImageSource(customSpriteSheetPath),
    miscSpriteSheet: new ImageSource(miscSpriteSheetPath),
    slimeSpriteSheet: new ImageSource(slimeSpriteSheetPath),
    TiledMap: new TiledResource('./res/test-level.tmx', {
        entityClassNameFactories: {
            playeractor: PlayerActorFactory.create,
            crate: CrateActorFactory.create,
            pngSlime: SlimeActorFactory.create,
            npcMerchant: MerchantActorFactory.create,
            //pngSlimeFriendly: SlimeActorFactory.create,
        },
    })
}


export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}
