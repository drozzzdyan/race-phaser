import Phaser from 'phaser';
import Map from '../classes/Map';
import Player from '../classes/Player';

const LAPS = 1;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {

  }

  create() {
    this.map = new Map(this);
    this.player = new Player(this, this.map);
    console.log(this.children)

    this.cameras.main.setBounds(0, 0, this.map.tilemap.widthInPixels, this.map.tilemap.heightInPixels);
    this.cameras.main.startFollow(this.player.car);

    this.player.car.on('lap', this.onLapComplete, this);
    this.matter.world.on('collisionactive', (event, obj1, obj2) => {
      // console.log(event, obj1.gameObject.frame.name, obj2.gameObject.frame.name);

      if (obj1.gameObject.frame.name === 'oil' && obj2.gameObject === this.player.car) {
        this.player.slide();
      }
    })
  }

  onLapComplete(lap) {
    if (lap > LAPS) {
      console.log('restart')
      this.scene.restart();
    }
  }

  update() {
    this.player.move();
  }
}