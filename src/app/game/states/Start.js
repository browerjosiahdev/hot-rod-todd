'use strict';

import TextButton from '../gameobjects/TextButton';

/**
 * This class is the core of the game. It manages the game play and is in charge
 * of the render and update loops.
 */
class Start extends Phaser.State {
  /**
	 * Create the main game state.
	 */
  create () {
    this.game.loadCompleteCallback();

    this.createAnimation();
    this.createMenuItems(this.game.data.start);
    this.createSoundAssets();
  }

  createAnimation () {
    this.star = this.game.add.sprite(320, 228, 'start-star');
    this.star.anchor.setTo(.5, .5);
    this.star.scale.x = 0;
    this.star.scale.y = 0;
    this.star.animations.add('sparkle', [0, 1]);
    this.star.animations.play('sparkle', 5, true);

    this.trailGroup = this.game.add.group();

    this.man = this.game.add.sprite(143, 364, 'start-man');
    this.man.anchor.setTo(.5, .5);
    this.man.scale.x = 0;
    this.man.scale.y = 0;

    this.woman = this.game.add.sprite(477, 344, 'start-woman');
    this.woman.anchor.setTo(.5, .5);
    this.woman.scale.x = 0;
    this.woman.scale.y = 0;

    this.title = this.game.add.sprite(320, 580, 'start-title');
    this.title.alpha = 0;
    this.title.anchor.setTo(.5, .5);
    this.title.scale.x = 3;
    this.title.scale.y = 3;

    this.game.add.tween(this.star.scale)
      .to({x: 1, y: 1}, 3000, Phaser.Easing.Quadratic.InOut)
      .delay(500)
      .start();

    this.game.add.tween(this.man.scale)
      .to({x: 1, y: 1}, 750, Phaser.Easing.Back.Out)
      .delay(1100)
      .start();

    this.game.add.tween(this.woman.scale)
      .to({x: 1, y: 1}, 750, Phaser.Easing.Back.Out)
      .delay(1500)
      .start();

    this.game.add.tween(this.title.scale)
      .to({x: 1, y: 1}, 1250, Phaser.Easing.Quadratic.InOut)
      .delay(1800)
      .start();

    this.game.add.tween(this.title)
      .to({alpha: 1, rotation: 6.28319}, 1250, Phaser.Easing.Quadratic.InOut)
      .delay(1800)
      .start();

    this.game.add.tween(this.man)
      .to({rotation: .25}, 1500, Phaser.Easing.Quadratic.InOut)
      .delay(2200)
      .repeat(-1)
      .yoyo(true)
      .start();

    this.game.add.tween(this.woman)
      .to({rotation: -.25}, 1500, Phaser.Easing.Quadratic.InOut)
      .delay(2900)
      .repeat(-1)
      .yoyo(true)
      .start();

    const manTween = this.game.add.tween(this.man)
      .to({y: this.man.y - 50}, 1000, Phaser.Easing.Quadratic.InOut)
      .delay(2200)
      .repeat(-1)
      .yoyo(true)
      .start();

    const womanTween = this.game.add.tween(this.woman)
      .to({y: this.woman.y - 50}, 1000, Phaser.Easing.Quadratic.InOut)
      .delay(2900)
      .repeat(-1)
      .yoyo(true)
      .start();

    const createManTrail = () => {
      const trail = this.trailGroup.create(this.man.x - 80, this.man.y + 40, 'puff');
      trail.anchor.setTo(.5, .5);
      const trailTween = this.game.add.tween(trail.scale)
        .to({x: 0, y: 0}, 500, Phaser.Easing.Quadratic.InOut)
        .start();

      this.game.add.tween(trail)
        .to({x: trail.x - 100, y: trail.y + 100}, 500, Phaser.Easing.Quadratic.InOut)
        .start();

      trailTween.onComplete.add(() => {
        trail.destroy();
      });
    };

    const createWomanTrail = () => {
      const trail = this.trailGroup.create(this.woman.x + 40, this.woman.y + 20, 'puff');
      trail.anchor.setTo(.5, .5);
      const trailTween = this.game.add.tween(trail.scale)
        .to({x: 0, y: 0}, 500, Phaser.Easing.Quadratic.InOut)
        .start();

      this.game.add.tween(trail)
        .to({x: trail.x + 100, y: trail.y + 100}, 500, Phaser.Easing.Quadratic.InOut)
        .start();

      trailTween.onComplete.add(() => {
        trail.destroy();
      });
    };

    womanTween.onLoop.add(() => {
      womanTween.isForward = !womanTween.isForward;
      if (womanTween.isForward) {
        createWomanTrail();
      }
    });

    womanTween.onStart.add(() => {
      createWomanTrail();
      womanTween.isForward = true;

      this.start();
    });

    manTween.onLoop.add(() => {
      manTween.isForward = !manTween.isForward;
      if (manTween.isForward) {
        createManTrail();
      }
    });

    manTween.onStart.add(() => {
      createManTrail();
      manTween.isForward = true;
    });
  }

  createMenuItems ( data ) {
    this.facebookBtn = this.game.add.button(250, 960, 'facebook', () => {
      this.game.shareFacebook();
    });

    this.twitterBtn = this.game.add.button(334, 960, 'twitter', () => {
      this.game.shareTwitter();
    });

    this.startBtn = new TextButton(this.game, 86, 960, data.startBtn, 0x0F5EA3);
    this.startBtn.onInputDown.add(this.startGame, this);
    this.game.world.add(this.startBtn);

    this.shareBtn = new TextButton(this.game, 86, 1045, data.shareBtn, 0xf58022);
    this.shareBtn.onInputDown.add(this.shareGame, this);
    this.game.world.add(this.shareBtn);

    this.eliteBtn = new TextButton(this.game, 86, 1130, data.eliteBtn, 0x2a7535);
    this.eliteBtn.onInputDown.add(this.openElite, this);
    this.game.world.add(this.eliteBtn);

    const startTween = this.game.add.tween(this.startBtn)
      .to({y: 690}, 850, Phaser.Easing.Back.InOut)
      .delay(1400)
      .start();

    const shareTween = this.game.add.tween(this.shareBtn)
      .to({y: 775}, 850, Phaser.Easing.Back.InOut)
      .delay(1700)
      .start();

    const eliteTween = this.game.add.tween(this.eliteBtn)
      .to({y: 860}, 850, Phaser.Easing.Back.InOut)
      .delay(2000)
      .start();

    shareTween.onComplete.add(() => {
      this.facebookBtn.y = 775;
      this.twitterBtn.y = 775;
    });
  }

  createSoundAssets () {
    this.game.soundFx = this.game.add.audioSprite('fx');
    this.game.backgroundMusic = this.game.add.audio('background-music', 1, true);

      // If the web audio api is not supported we need to load seperate files
      // if we want the sound playback to overlap
    if (!this.game.device.webAudio) {
      this.game.boostFx = this.game.add.audio('boost');
      this.game.wallFx = this.game.add.audio('wall');
    }
  }

  start () {
    this.game.backgroundMusic.play('', 0, .4);
  }

  startGame ( pointer, e ) {
    this.game.soundFx.play('button-click');
    this.game.state.start('CharacterSelection');
  }

  shareGame ( pointer, e ) {
    this.game.soundFx.play('social-click');
    this.shareBtn.visible = false;
  }

  openElite ( pointer, e ) {
    this.game.openElite();
  }
}

export default Start
