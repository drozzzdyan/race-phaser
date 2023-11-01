import Phaser from 'phaser';
import Map from '../classes/Map';
import Player from '../classes/Player';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {

  }

  create() {
    this.map = new Map(this);
    this.player = new Player(this, this.map);

    this.cameras.main.setBounds(0, 0, this.map.tilemap.widthInPixels, this.map.tilemap.heightInPixels);
    this.cameras.main.startFollow(this.player.car);
  }
}