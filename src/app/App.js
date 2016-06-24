'use strict';

import $ from 'jquery';
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

    // Get the DOM elements for the form used to save the
    // users high score.
    this.saveScoreForm = this.container.querySelector('.save-score-container');
    this.saveScoreFormName = this.saveScoreForm.querySelector('#saveName');
    this.saveScoreFormScore = this.saveScoreForm.querySelector('#saveScore');
    this.saveScoreFormSubmit = this.saveScoreForm.querySelector('#scoreSaveBtn');

    // Get a bound handle to the method called to save the
    // users high score.
    this.handleSaveHighScore = this.onSaveHighScore.bind(this);

    // Create the Web API url used to get/save user high scores.
    this.windowUrl = 'http://dev-cwsandbox.allencomm.com';// window.location.protocol + '//' + window.location.host;
    this.apiUrl = this.windowUrl + '/api/hotRodTodd/';

    this.game = new Game(this.data, this.container.querySelector('.game'));
    this.game.onLoadComplete(() => {
      this.container.classList.remove('hidden');
    });
    this.game.onGameOver((highScore, highLevel) => {
      // Determine the current high score.
      var currentHighScore = parseInt(this.highScoreDisplay.innerHTML);

      this.highScoreDisplay.innerHTML = highScore;
      this.highLevelDisplay.innerHTML = highLevel;

      // Only show the high score screen if the score they just
      // earned is higher then their current high score.
      if (typeof currentHighScore === 'number' && currentHighScore < highScore) {
        // Set the value for the score input field in the high
        // score save form.
        this.saveScoreFormScore.value = highScore;
        this.saveScoreFormSubmit.addEventListener('click', this.handleSaveHighScore);
        this.saveScoreForm.classList.remove('hidden');
      }
    });
    this.game.start();

    this.saveState = this.game.getSaveState();
    this.highScoreDisplay.innerHTML = this.saveState.highScore || 0;
    this.highLevelDisplay.innerHTML = this.saveState.highLevel || 0;
  }

  /**
   * Save the users high score.
   */
  onSaveHighScore (e) {
    // Remove the click event listener from the save submit button
    // and call to the Web API to save the high score. Once the
    // high score has saved, hide the popup so the user can retry
    // the game if they want to.
    this.saveScoreFormSubmit.removeEventListener('click', this.handleSaveHighScore);
    $.ajax({
      data: {
        name: this.saveScoreFormName.value.slice(0, 3),
        score: parseInt(this.saveScoreFormScore.value)
      },
      error: function (err) {
          console.warn('Error saving score: ');
          console.log(err);
          this.saveScoreForm.classList.add('hidden');
      }.bind(this),
      success: function () {
        this.saveScoreForm.classList.add('hidden');
      }.bind(this),
      type: 'POST',
      url: this.apiUrl + 'highscore'
    });
  }
}

export default App
