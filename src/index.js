import Phaser from 'phaser';
import BootScene from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import MenuScene from './scripts/scenes/MenuScene';

const config = {
  type: Phaser.AUTO,
  width: 2048,
  height: 1152,
  scene: [BootScene, PreloadScene, MenuScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};

const game = new Phaser.Game(config);
