import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    console.log('kuku')
  }

  create() {

    this.scene.start('MenuScene');
  }
}