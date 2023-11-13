import Phaser from 'phaser';
import BootScene from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import GameScene from './scripts/scenes/GameScene';
import StartScene from './scripts/scenes/StartScene';
import WaitingScene from './scripts/scenes/WaitingScene';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  scene: [BootScene, PreloadScene, StartScene, WaitingScene, GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'matter',
    matter: {
      // debug: true,
      gravity: { x: 0, y: 0 },
    }
  },
};

const game = new Phaser.Game(config);
