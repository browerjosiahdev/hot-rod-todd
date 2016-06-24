'use strict';

import TextButton from '../gameobjects/TextButton';

/**
 * This class is the core of the game. It manages the game play and is in charge
 * of the render and update loops.
 */
class About extends Phaser.State {
  init ( character ) {
    this.character = character;
  }

  /**
	 * Create the main game state.
	 */
  create () {
    const aboutData = this.game.data.about;

    const title = this.game.add.text(0, 75, aboutData.title, {
      fill: "#0f5ea3",
      font: "bold 44px Arial"
    });
    title.x = (this.game.world.width - title.width) / 2;

    const content = this.game.add.text(85, 195, aboutData.content, {
      align: 'center',
      fill: "#000000",
      font: "36px Arial",
      wordWrap: true,
      wordWrapWidth: 470
    });

    this.facebookBtn = this.game.add.button(250, 775, 'facebook', () => {
      this.game.shareFacebook();
    });

    this.twitterBtn = this.game.add.button(334, 775, 'twitter', () => {
      this.game.shareTwitter();
    });

    const resumeBtn = new TextButton(this.game, 86, 690, aboutData.resumeBtn, 0x0F5EA3);
    resumeBtn.onInputDown.add(this.resumeGame, this);
    this.game.world.add(resumeBtn);

    this.shareBtn = new TextButton(this.game, 86, 775, aboutData.shareBtn, 0xf58022);
    this.shareBtn.onInputDown.add(this.shareGame, this);
    this.game.world.add(this.shareBtn);

    const eliteBtn = new TextButton(this.game, 86, 860, aboutData.eliteBtn, 0x2a7535);
    eliteBtn.onInputDown.add(this.openElite, this);
    this.game.world.add(eliteBtn);
  }

  resumeGame ( pointer, e ) {
    this.game.soundFx.play('button-click');
    this.game.state.start("Main", true, false, this.character);
  }

  shareGame ( pointer, e ) {
    this.game.soundFx.play('social-click');
    this.shareBtn.visible = false;
  }

  openElite ( pointer, e ) {
    this.game.openElite();
  }
}

export default About
