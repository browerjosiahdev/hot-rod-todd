'use strict';

import ComponentBase from './components/ComponentBase';
import Game from './Game';

/**
 * This class creates the application elements and manages the high-level
 * navigation. It helps bridge the gap between the game (WebGL/Canvas) and the
 * HTML panels, including the intro screens and video panel.
 */
class App extends ComponentBase {
  /**
	 * Process the data before it is used to populate the handlebars template.
	 */
  preprocess () {
		super.preprocess();
		this.data.template = 'App';
    this.data.width = 640;
    this.data.height = 960;
	}

  /**
	 * Initialize the component items.
	 */
  init () {
    super.init();

    this.highScoreDisplay = this.container.querySelector('.high-score-display');
    this.highLevelDisplay = this.container.querySelector('.high-level-display');

    this.game = new Game(this.data, this.container.querySelector('.game'));
    this.game.onLoadComplete(() => {
      this.container.classList.remove('hidden');
    });
    this.game.onGameOver((highScore, highLevel) => {
      this.highScoreDisplay.innerHTML = highScore;
      this.highLevelDisplay.innerHTML = highLevel;
    });
    this.game.start();

    this.saveState = this.game.getSaveState();
    this.highScoreDisplay.innerHTML = this.saveState.highScore || 0;
    this.highLevelDisplay.innerHTML = this.saveState.highLevel || 0;
  }
}

export default App
