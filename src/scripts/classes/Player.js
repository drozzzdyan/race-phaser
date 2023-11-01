export default class Player {
  constructor(scene, map) {
    this.scene = scene;
    this.map = map;
    const position = this.map.getPLayerPosition();
    this.car = this.scene.matter.add.sprite(position.x, position.y, 'cars', 'car_black_1').setOrigin(0.5);
    this.car.setAngle(90);
    this.car.setScale(0.5);
  }
}