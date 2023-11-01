const DIRECTIONS = Object.freeze({ BACKWARD: -1, NONE: 0, FORWARD: 1 });
const SPEED = 10;

export default class Player {
  constructor(scene, map) {
    this.scene = scene;
    this.map = map;
    const position = this.map.getPLayerPosition();
    this.car = this.scene.matter.add.sprite(position.x, position.y, 'cars', 'car_black_1').setOrigin(0.5);
    this.car.setAngle(90);
    this.car.setScale(0.5);
  }

  get direction() {
    let direction = DIRECTIONS.NONE;

    if (this.scene.cursors.up.isDown) {
      direction = DIRECTIONS.FORWARD;
    } else if (this.scene.cursors.down.isDown) {
      direction = DIRECTIONS.BACKWARD;
    }

    return direction;
  }

  get velocity() {
    return SPEED * this.direction;
  }

  getVelocityFromAngle() {
    const vec2 = new Phaser.Math.Vector2();
    return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity);
  }

  move() {
    const velocity = this.getVelocityFromAngle();
    this.car.setVelocity(velocity.x, velocity.y)
  }
}