import Phaser from 'phaser';
import Map from '../classes/Map';
import Player from '../classes/Player';
import Stats from '../classes/Stats';
import StatsPanel from '../classes/StatsPanel';
import StatsPopup from '../classes/StatsPopup';

const LAPS = 3;
const CARS = {
  BLACK: {
    sprite: 'car_black_1',
    position: 'player',
  },
  GREEN: {
    sprite: 'car_green_1',
    position: 'enemy',
  }
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    if (data.client) {
      this.client = data.client;
    }
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  getCarsConfig() {
    let config = {
      player: CARS.BLACK,
      enemy: CARS.GREEN,
    };

    // определение второго игрока
    if (this.client && !this.client.master) {
      config = {
        player: CARS.GREEN,
        enemy: CARS.BLACK,
      };
    }

    return config;
  }

  create() {
    this.map = new Map(this);

    const car = this.getCarsConfig();
    this.player = new Player(this, this.map, car.player);
    if (this.client) {
      this.enemy = new Player(this, this.map, car.enemy);
      this.client.on('data', data => {
        this.enemy.car.setX(data.x);
        this.enemy.car.setY(data.y);
        this.enemy.car.setAngle(data.angle);
      })
    }

    this.stats = new Stats(this, LAPS);
    this.statsPanel = new StatsPanel(this, this.stats);

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
      this.statsPopup = new StatsPopup(this, this.stats);
    }
  }

  update(time, dt) {
    this.stats.update(dt);
    this.statsPanel.render();
    this.player.move();
    this.sync();
  }

  sync() {
    if (this.client) {
      this.client.send({
        x: this.player.car.x,
        y: this.player.car.y,
        angle: this.player.car.angle,
      })
    }
  }
}