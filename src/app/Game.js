'use strict';

import PhaserPackage from 'phaser';
import Boot from './game/states/Boot';
import Preload from './game/states/Preload';
import Start from './game/states/Start';
import CharacterSelection from './game/states/CharacterSelection';
import About from './game/states/About';
import Main from './game/states/Main';
import GameOver from './game/states/GameOver';

/**
 * This class manages all of the different game states and provides access
 * to many of the Phaser subsystems.
 */
class Game extends Phaser.Game {
  /**
	 * Create the game instance and define its states.
	 */
  constructor ( data, container ) {
    super(data.width, data.height, Phaser.CANVAS, container);
    this.data = data;
    this.container = container;
    this.gameURL = window.location.href.split('?', 1)[0].split('#', 1)[0];

      // URL must include reference to the index html page otherwise
      // open graph parser won't find the page
    if (this.gameURL.indexOf('index.html') < 0) {
      if (this.gameURL.charAt(this.gameURL.length - 1) !== '/') {
        this.gameURL += '/';
      }
      this.gameURL += 'index.html';
    }

    if ((window.localStorage) && (window.localStorage.rocketGameSaveState)) {
      this.saveState = JSON.parse(window.localStorage.rocketGameSaveState);
    } else {
      this.saveState = {};
    }

      // Define game states
    this.state.add('Boot', Boot);
    this.state.add('Preload', Preload);
    this.state.add('Start', Start);
    this.state.add('CharacterSelection', CharacterSelection);
    this.state.add('About', About);
    this.state.add('Main', Main);
    this.state.add('GameOver', GameOver);
  }

  /**
	 * Start the game by launching the boot state.
	 */
  start () {
    this.state.start("Boot");
  }

  onLoadComplete ( callback ) {
    this.loadCompleteCallback = callback;
  }

  onGameOver ( callback ) {
    this.gameOverCallback = callback;
  }

  getSaveState () {
    return this.saveState;
  }

  setSaveState ( data ) {
    this.saveState = data;

    try {
      window.localStorage.rocketGameSaveState = JSON.stringify(this.saveState);
    } catch ( e ) {}
  }

  shareFacebook () {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + this.gameURL, '_blank');
  }

  shareTwitter () {
    window.open('https://twitter.com/intent/tweet?url=' + this.gameURL, '_blank');
  }

  openElite () {
    window.open('https://google.com', '_blank');
  }
}

export default Game
