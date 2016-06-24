'use strict';

import TextButton from '../gameobjects/TextButton';
import ToBlob from 'toblob';
import FileSaver from 'filesaver';

/**
 * This class is the core of the game. It manages the game play and is in charge
 * of the render and update loops.
 */
class GameOver extends Phaser.State {
  init ( character, score, level ) {
    this.character = character;
    this.saveState = this.game.getSaveState();
    this.score = score;
    this.level = level;

    if ((!this.saveState.highScore) || (this.score > this.saveState.highScore)) {
      this.saveState.highScore = this.score;
    }
    if ((!this.saveState.highLevel) || (this.level > this.saveState.highLevel)) {
      this.saveState.highLevel = this.level;
    }
    this.saveState.gamesPlayed = (this.saveState.gamesPlayed || 0) + 1;

    if (this.game.gameOverCallback) {
      this.game.gameOverCallback(this.saveState.highScore, this.saveState.highLevel);
    }

    this.game.setSaveState(this.saveState);
  }

  /**
	 * Create the main game state.
	 */
  create () {
    const gameOverData = this.game.data.gameOver;

    const title = this.game.add.text(0, 55, gameOverData.title, {
      fill: "#a41431",
      font: "bold 70px Arial"
    });
    title.x = (this.game.world.width - title.width) / 2;

    const score = this.game.add.text(74, 160, this.replaceTokens(gameOverData.score), {
      fill: "#000000",
      font: "38px Arial"
    });

    const highScore = this.game.add.text(74, 295, this.replaceTokens(gameOverData.highScore), {
      fill: "#000000",
      font: "38px Arial"
    });

    const highLevel = this.game.add.text(74, 355, this.replaceTokens(gameOverData.highLevel), {
      fill: "#000000",
      font: "38px Arial"
    });

    const gamesPlayed = this.game.add.text(74, 420, this.replaceTokens(gameOverData.gamesPlayed), {
      fill: "#000000",
      font: "38px Arial"
    });

    this.facebookBtn = this.game.add.button(250, 580, 'facebook', () => {
      this.game.shareFacebook();
    });

    this.twitterBtn = this.game.add.button(334, 580, 'twitter', () => {
      this.game.shareTwitter();
    });

    this.replayBtn = new TextButton(this.game, 86, 496, gameOverData.replayBtn, 0x0F5EA3);
    this.replayBtn.onInputDown.add(this.replayGame, this);
    this.game.world.add(this.replayBtn);

    this.shareBtn = new TextButton(this.game, 86, 580, gameOverData.shareBtn, 0xf58022);
    this.shareBtn.onInputDown.add(this.shareGame, this);
    this.game.world.add(this.shareBtn);

    const elite = this.game.add.text(74, 685, this.replaceTokens(gameOverData.elite), {
      fill: "#000000",
      font: "32px Arial",
      wordWrap: true,
      wordWrapWidth: 492
    });

    this.eliteBtn = new TextButton(this.game, 86, 860, gameOverData.eliteBtn, 0x2a7535);
    this.eliteBtn.onInputDown.add(this.openElite, this);
    this.game.world.add(this.eliteBtn);
  }

  replaceTokens ( value ) {
    return value.replace(/{score}/g, this.score)
      .replace(/{level}/g, this.level)
      .replace(/{highScore}/g, this.saveState.highScore)
      .replace(/{highLevel}/g, this.saveState.highLevel)
      .replace(/{gamesPlayed}/g, this.saveState.gamesPlayed);
  }

  replayGame ( pointer, e ) {
    this.game.soundFx.play('button-click');
    this.game.state.start("Main", true, false, this.character);
  }

  saveScreenShot ( pointer, e ) {
    document.querySelector('canvas').toBlob((blob) => {
      FileSaver(blob, 'game-results.png');
    });
  }

  shareGame ( pointer, e ) {
    this.game.soundFx.play('social-click');
    this.shareBtn.visible = false;
  }

  openElite ( pointer, e ) {
    this.game.openElite();
  }
}

export default GameOver
