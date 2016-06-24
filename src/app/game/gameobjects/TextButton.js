'use strict';

/**
 * This class manages the game preload sequence.
 */
class TextButton extends Phaser.Button {
  constructor (game, x, y, text, backgroundColor, width = 468) {
    super(game, x, y);

    const background = new PIXI.Graphics();
    background.beginFill(backgroundColor);
    background.drawRoundedRect(0, 0, width, 64, 15);
    background.endFill();
    background.postUpdate = () => {};
    this.addChild(background);

    const label = this.game.add.text(0, 12, text, {
      fill: "#ffffff",
      font: "bold 34px Arial"
    });
    label.x = (background.width - label.width) / 2;
    this.addChild(label);

    this.hitArea = new PIXI.Rectangle(0, 0, background.width, background.height);
  }
}

export default TextButton
