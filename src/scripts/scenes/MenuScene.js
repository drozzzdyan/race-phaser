import Phaser from 'phaser';
import Map from '../classes/Map';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {

  }

  create() {
    this.map = new Map(this);
  }
}