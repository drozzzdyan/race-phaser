import Phaser from 'phaser';
import tilesetPng from '../../../public/assets/spritesheet_tiles.png';
import tilesetJson from '../../../public/assets/tile-map.json';
import objectsPng  from '../../../public/assets/objects.png';
import objectsJson  from '../../../public/assets/objects.json';
import carsPng  from '../../../public/assets/cars.png';
import carsJson  from '../../../public/assets/cars.json';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.spritesheet('tileset', tilesetPng, { frameWidth: 64, frameHeight: 64 });
    this.load.tilemapTiledJSON('tilemap', tilesetJson);

    this.load.atlas('objects', objectsPng, objectsJson);
    this.load.atlas('cars', carsPng, carsJson);
  }

  create() {
    this.scene.start('StartScene');
  }
}