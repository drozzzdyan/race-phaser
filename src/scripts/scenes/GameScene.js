import Phaser from 'phaser';
import Map from '../classes/Map';
import Player from '../classes/Player';
import Stats from '../classes/Stats';

const LAPS = 4;

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
    this.stats = new Stats(this, LAPS);
    
    this.cameras.main.setBounds(0, 0, this.map.tilemap.widthInPixels, this.map.tilemap.heightInPixels);
    this.cameras.main.startFollow(this.player.car);

    this.player.car.on('lap', this.onLapComplete, this);
    this.matter.world.on('collisionactive', (event, obj1, obj2) => {

      if (obj1.gameObject.frame.name === 'oil' && obj2.gameObject === this.player.car) {
        this.player.slide();
      }
    })
  }

  onLapComplete() {
    this.stats.onLapComplete();

    if (this.stats.complete) {
      console.log('restart');
      this.scene.restart();
    }
  }

  update(time, dt) {
    this.stats.update(dt);
    this.player.move();
  }
}