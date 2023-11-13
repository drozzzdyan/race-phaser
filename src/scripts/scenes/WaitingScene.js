import Client from "../classes/Client";

export default class WaitingScene extends Phaser.Scene {
  constructor() {
    super('WaitingScene');
  }

  create() {
    this.createText();
    this.createClient();
  }

  createText() {
    const styleBtn = { font: 'bold 46px Arial', fill: '#fafad2' };
    const xBtn = this.cameras.main.centerX;
    const yBtn = this.cameras.main.centerY;

    const shadeWidth = this.sys.game.config.width;
    const shadeHeight = this.sys.game.config.height;

    this.shade = this.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.7)
      .fillRect(0, 0, shadeWidth, shadeHeight);

    this.button = this.add.text(xBtn, yBtn, 'Waiting your opponent..', styleBtn)
      .setOrigin(.5)
      .setInteractive();
  }

  createClient() {
    this.client = new Client();
    this.client.init();
    this.client.on('gameStartPhaser', this.startGame, this);
  }

  startGame() {
    this.scene.start('GameScene', { client: this.client });
  }
}