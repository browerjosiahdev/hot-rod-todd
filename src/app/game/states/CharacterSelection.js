'use strict';

import TextButton from '../gameobjects/TextButton';

/**
 * This class is the core of the game. It manages the game play and is in charge
 * of the render and update loops.
 */
class CharacterSelection extends Phaser.State {

  init ( character ) {
    this.saveState = this.game.getSaveState();
    this.saveState.character = this.saveState.character || 0;
  }

  /**
	 * Create the main game state.
	 */
  create () {
    const characterSelectionData = this.game.data.characterSelection;

    this.choiceMan = this.game.add.sprite(70, 220, 'choice-man');
    this.choiceMan.inputEnabled = true;
    this.choiceMan.input.useHandCursor = true;
    this.choiceMan.events.onInputDown.add(this.selectMan, this);
    if (this.saveState.character === 0) {
      this.choiceMan.frame = 1;
    }

    this.choiceWoman = this.game.add.sprite(340, 220, 'choice-woman');
    this.choiceWoman.inputEnabled = true;
    this.choiceWoman.input.useHandCursor = true;
    this.choiceWoman.events.onInputDown.add(this.selectWoman, this);
    if (this.saveState.character === 1) {
      this.choiceWoman.frame = 1;
    }

    const title = this.game.add.text(0, 75, characterSelectionData.title, {
      fill: "#0f5ea3",
      font: "bold 44px Arial"
    });
    title.x = (this.game.world.width - title.width) / 2;

    this.facebookBtn = this.game.add.button(250, 704, 'facebook', () => {
      this.game.shareFacebook();
    });

    this.twitterBtn = this.game.add.button(334, 704, 'twitter', () => {
      this.game.shareTwitter();
    });

    this.startBtn = new TextButton(this.game, 86, 622, characterSelectionData.startBtn, 0x0F5EA3);
    this.startBtn.onInputDown.add(this.startGame, this);
    this.game.world.add(this.startBtn);

    this.shareBtn = new TextButton(this.game, 86, 704, characterSelectionData.shareBtn, 0xf58022);
    this.shareBtn.onInputDown.add(this.shareGame, this);
    this.game.world.add(this.shareBtn);

    const elite = this.game.add.text(74, 815, characterSelectionData.elite, {
      fill: "#000000",
      font: "22px Arial",
    });
    elite.x = (this.game.world.width - elite.width) / 2;

    this.eliteBtn = new TextButton(this.game, 86, 860, characterSelectionData.eliteBtn, 0x2a7535);
    this.eliteBtn.onInputDown.add(this.openElite, this);
    this.game.world.add(this.eliteBtn);
  }

  startGame ( pointer, e ) {
    this.game.soundFx.play('button-click');
    this.game.state.start('Main', true, false, this.saveState.character);
  }

  shareGame ( pointer, e ) {
    this.game.soundFx.play('social-click');
    this.shareBtn.visible = false;
  }

  openElite ( pointer, e ) {
    this.game.openElite();
  }

  selectMan () {
    this.game.soundFx.play('hero-select');
    this.choiceMan.frame = 1;
    this.choiceWoman.frame = 0;
    this.saveState.character = 0;
    this.game.setSaveState(this.saveState);
  }

  selectWoman () {
    this.game.soundFx.play('hero-select');
    this.choiceMan.frame = 0;
    this.choiceWoman.frame = 1;
    this.saveState.character = 1;
    this.game.setSaveState(this.saveState);
  }
}

export default CharacterSelection
