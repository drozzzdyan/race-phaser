import Client from "../classes/Client";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  create() {
    this.createBackground();
    this.createButtons();
    this.setEvents();
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createButtons() {
    const styleBtn = { font: 'bold 46px Arial', fill: '#fafad2' };
    const xBtn = this.cameras.main.centerX;
    const yBtn = this.cameras.main.centerY;

    const shadeWidth = this.sys.game.config.width;
    const shadeHeight = this.sys.game.config.height;

    this.shade = this.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.7)
      .fillRect(0, 0, shadeWidth, shadeHeight);

    this.button1 = this.add.text(xBtn, yBtn - 50, 'SINGLE PLAYER', styleBtn)
      .setOrigin(.5)
      .setInteractive();

    this.button2 = this.add.text(xBtn, yBtn + 50, 'MULTI PLAYER', styleBtn)
      .setOrigin(.5)
      .setInteractive();
  }

  setEvents() {
    this.button1.on('pointerdown', this.startGame, this);
    this.button2.on('pointerdown', this.requestGame, this);
  }

  requestGame() {
    this.scene.start('WaitingScene');
  }

  startGame() {
    this.scene.start('GameScene');
  }
}