import Phaser from 'phaser';
import tilesetPng from '../../assets/spritesheet_tiles.png';
import tilesetJson from '../../assets/tile-map.json';
import objectsPng  from '../../assets/objects.png';
import objectsJson  from '../../assets/objects.json';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.load.spritesheet('tileset', tilesetPng, { frameWidth: 64, frameHeight: 64 });
    this.load.tilemapTiledJSON('tilemap', tilesetJson);

    this.load.atlas('objects', objectsPng, objectsJson);
  }

  create() {

    this.scene.start('MenuScene');
  }
}