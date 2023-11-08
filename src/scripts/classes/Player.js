const DIRECTIONS = Object.freeze({ BACKWARD: -0.4, NONE: 0, FORWARD: 1 });
const TURNS = Object.freeze({ LEFT: -1, NONE: 0, RIGHT: 1 });

const SPEED = 4;
const ACCELERATION = 0.08;
const TURNING_SPEED_COEFFICIENT = 0.6;
const SLIDE = 2;

export default class Player {
  constructor(scene, map) {
    this.scene = scene;
    this.map = map;
    const position = this.map.getPLayerPosition();
    this.car = this.scene.matter.add.sprite(position.x, position.y, 'cars', 'car_black_1').setOrigin(0.5);
    this.car.setAngle(90);
    this.car.setScale(0.5);
    this.car.setFixedRotation(true);
    this._velocity = 0;

    this.currentCheckpoint = 0;
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

  get turn() {
    let turn = TURNS.NONE;

    if (this.scene.cursors.left.isDown && this._velocity != 0) {
      turn = TURNS.LEFT;
    } else if (this.scene.cursors.right.isDown && this._velocity != 0) {
      turn = TURNS.RIGHT;
    }

    return turn;
  }

  get velocity() {
    const speed = Math.abs(this._velocity);
    const maxSpeed = this.getMaxSpeed();

    if(this.direction && speed < maxSpeed) {
      this._velocity += ACCELERATION * this.direction;
    } else if(!this.direction && speed > 0 || this.direction && speed > maxSpeed) {
      this._velocity -= ACCELERATION * Math.sign(this._velocity);

      if(speed < ACCELERATION) {
        this._velocity = 0;
      }
    }

    return this._velocity;
  }

  get angle() {
    return this.car.angle + TURNING_SPEED_COEFFICIENT * this._velocity * this.turn;
  }

  getVelocityFromAngle() {
    const vec2 = new Phaser.Math.Vector2();
    return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity);
  }

  getMaxSpeed() {
    return SPEED * this.map.getTileFriction(this.car);
  }

  move() {
    this.car.setAngle(this.angle);
    const velocity = this.getVelocityFromAngle();
    this.car.setVelocity(velocity.x, velocity.y);
    this.checkPosition();
  }

  slide() {
    this.car.angle -= SLIDE;
  }

  checkPosition() {
    const checkpoint = this.map.getCheckpoint(this.car);

    if (checkpoint) {
      this.onCheckpoint(checkpoint);
    }
  }

  onCheckpoint(checkpoint) {
    if (checkpoint === 1 && this.currentCheckpoint === this.map.checkpoints.length) {
      this.currentCheckpoint++;
      this.car.emit('lap');
    } else if (checkpoint - this.currentCheckpoint === 1) {
      this.currentCheckpoint++;
    }
  }
}