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
  }

  createLayers() {
    this.tilemap.createLayer('grass', this.tileset);
    this.tilemap.createLayer('road', this.tileset);
    this.tilemap.createLayer('ground', this.tileset);
    this.tilemap.createLayer('sand', this.tileset);
  }

  createCollisions() {
    this.tilemap.findObject('collisions', el => {
      const sprite = this.scene.matter.add.sprite(el.x, el.y, 'objects', el.name);
      sprite.setAngle(el.rotation);
      sprite.setSize(el.width, el.height);
      sprite.setOrigin(0, 1);
      sprite.setStatic(true);
    })
  }

  getPLayerPosition() {
    return this.tilemap.findObject('player', el => { 
      return el.name === 'player';
    })
  }
}