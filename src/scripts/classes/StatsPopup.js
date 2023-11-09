export default class StatsPopup {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;
    this.create();
  }

  create() {
    const styleTitle = { font: '46px Arial', fill: '#fafad2' };
    const styleText = { font: '32px Arial', fill: '#fafad2' };

    const popupWidth = 600;
    const popupHeight = 400;
    const popupX = (this.scene.sys.game.config.width - popupWidth) / 2;
    const popupY = (this.scene.sys.game.config.height - popupHeight) / 2;

    const xInner = this.scene.cameras.main.centerX;
    const yInner = this.scene.cameras.main.centerY;

    this.popup = this.scene.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.7)
      .fillRect(popupX, popupY, popupWidth, popupHeight);

    this.title = this.scene.add.text(xInner, yInner - 160, 'Finish!', styleTitle)
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.time = this.scene.add.text(xInner, yInner - 40, `Time total: ${this.stats.time.toFixed(2)}`, styleText)
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.timeBest = this.scene.add.text(xInner, yInner + 40, `Time best: ${this.stats.timeBestLap.toFixed(2)}`, styleText)
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.textSkip = this.scene.add.text(xInner, yInner + 160, 'Tap to continue', styleText)
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.scene.input.once('pointerdown', () => {
      this.scene.scene.start('GameScene');
    })
  }
}