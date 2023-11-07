import Phaser from "phaser";

const GRASS_FRICTION = 0.2;
const ROADS_FRICTIONS = {
  road: 1,
  ground: 0.8,
  sand: 0.6,
}

export default class Map {
  constructor(scene) {
    this.scene = scene;
    this.init();
    this.create();
  }

  init() {
    this.tilemap = this.scene.make.tilemap({ key: 'tilemap' });
    this.tileset = this.tilemap.addTilesetImage('spritesheet_tiles', 'tileset', 64, 64, 0, 0);
  }

  create() {
    this.createLayers();
    this.createCollisions();
    this.createCheckpoints();
  }

  createLayers() {
    this.tilemap.createLayer('grass', this.tileset);
    this.tilemap.createLayer('road', this.tileset);
    this.tilemap.createLayer('ground', this.tileset);
    this.tilemap.createLayer('sand', this.tileset);
  }

  createCollisions() {
    this.tilemap.findObject('collisions', el => {
      const sprite = this.scene.matter.add.sprite(el.x + el.width / 2, el.y - el.height / 2, 'objects', el.name);

      if (el.name === 'tree_large' || el.name === 'tree_small' || el.name === 'tires_red_alt') {
        sprite.setBody("circle")
      }

      sprite.setStatic(true);
    })
  }

  createCheckpoints() {
    this.checkpoints = [];

    this.tilemap.findObject('checkpoints', el => {
      const rect = new Phaser.Geom.Rectangle(el.x, el.y, el.width, el.height);

      // const graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});
      // graphics.strokeRectShape(rect);

      rect.index = el.properties.find(prop => prop.name === 'value').value;
      this.checkpoints.push(rect);
    })
  }

  getPLayerPosition() {
    return this.tilemap.findObject('player', el => {
      return el.name === 'player';
    })
  }

  getTileFriction(car) {
    for (let el in ROADS_FRICTIONS) {
      let tile = this.tilemap.getTileAtWorldXY(car.x, car.y, false, this.scene.cameras.main, el);

      if (tile) {
        return ROADS_FRICTIONS[el];
      }
    }

    return GRASS_FRICTION;
  }

  getCheckpoint(car) {
    const checkpoint = this.checkpoints.find(checkpoint => checkpoint.contains(car.x, car.y));
    return checkpoint ? parseInt(checkpoint.index) : false;
  }
}