'use strict';

/**
 * This class manages the game boot sequence.
 */
class Boot extends Phaser.State {
  /**
	 * Create the boot state and continue to preload.
	 */
  create () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.time.advancedTiming = true;
    this.game.stage.backgroundColor = 0xbddff2;
    this.game.clearBeforeRender = false;

    this.game.state.start("Preload");
  }
}

export default Boot
