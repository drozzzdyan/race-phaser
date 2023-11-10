import Phaser from 'phaser';
import bgJpg from '../../../public/assets/bg.jpg';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('bg', bgJpg);
    console.log('boot')
  }

  create() {
    
    this.scene.start('PreloadScene');
  }
}