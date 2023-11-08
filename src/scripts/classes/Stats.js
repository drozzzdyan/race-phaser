export default class Stats {
  constructor(scene, laps) {
    this.scene = scene;
    this.laps = laps;
    this.lap = 1;

    this.time = 0;
    this.timeLap = 0;
    this.timeBestLap = 0;
    this.timeLastLap = 0;
  }

  get complete() {
    return this.lap > this.laps;
  }

  onLapComplete() {
    console.log('onLapComplete')
    this.lap++;

    if (this.timeBestLap === 0 || this.timeLap < this.timeBestLap) {
      this.timeBestLap = this.timeLap;
    }

    this.timeLastLap = this.timeLap;
    this.timeLap = 0;
  }

  update(dt) {
    if (!this.complete) {
      const dtSec = dt / 1000;

      this.time += dtSec;
      this.timeLap += dtSec;
    }
  }
}