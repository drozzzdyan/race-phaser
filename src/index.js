import Phaser from 'phaser';
import BootScene from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import MenuScene from './scripts/scenes/MenuScene';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  scene: [BootScene, PreloadScene, MenuScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: false,
      gravity: { x: 0, y: 0 },
    }
  },
};

const game = new Phaser.Game(config);
