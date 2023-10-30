import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  create() {
    
  }
}