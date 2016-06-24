'use strict';

/**
 * This class manages the game preload sequence.
 */
class Preload extends Phaser.State {
  /**
	 * Preload all of the game assets.
	 */
  preload () {
    this.game.load.audio('background-music', [
      'assets/audio/background.ogg',
      'assets/audio/background.mp3'
    ]);

      // If the web audio api is not supported we need to load seperate files
      // if we want the sound playback to overlap
    if (!this.game.device.webAudio) {
      this.game.load.audio('boost', [
        'assets/audio/boost.ogg',
        'assets/audio/boost.mp3'
      ]);
      this.game.load.audio('wall', [
        'assets/audio/wall.ogg',
        'assets/audio/wall.mp3'
      ]);
    }

    this.game.load.audiosprite('fx', [
      'assets/audio/fx.ogg',
      'assets/audio/fx.mp3'
    ],
    null,
    {
      "spritemap": {
        "boost": {
          "start": 0,
          "end": 0.30768707482993196,
          "loop": false
        },
        "button-click": {
          "start": 2,
          "end": 3.8249659863945578,
          "loop": false
        },
        "hero-select": {
          "start": 5,
          "end": 7.869047619047619,
          "loop": false
        },
        "obstacle": {
          "start": 9,
          "end": 10.001020408163265,
          "loop": false
        },
        "social-click": {
          "start": 12,
          "end": 14.29734693877551,
          "loop": false
        },
        "star": {
          "start": 16,
          "end": 16.809637188208615,
          "loop": false
        },
        "treasure": {
          "start": 18,
          "end": 19.346802721088437,
          "loop": false
        },
        "wall": {
          "start": 21,
          "end": 22.600952380952382,
          "loop": false
        }
      }
    }
  );

      // Social Media
    this.game.load.image('facebook', 'assets/img/social-media/facebook.png');
    this.game.load.image('twitter', 'assets/img/social-media/twitter.png');

      // Start State
    this.game.load.image('start-man', 'assets/img/start/man.png');
    this.game.load.image('start-woman', 'assets/img/start/woman.png');
    this.game.load.image('start-title', 'assets/img/start/title.png');
    this.game.load.spritesheet('start-star', 'assets/img/start/star.png', 445, 420);

      // Character Selection State
    this.game.load.spritesheet('choice-man', 'assets/img/character-selection/choice_man.png', 231, 230);
    this.game.load.spritesheet('choice-woman', 'assets/img/character-selection/choice_woman.png', 231, 230);

      // Main State
    this.game.load.image('wall-left', 'assets/img/main/wall-left.png');
    this.game.load.image('wall-right', 'assets/img/main/wall-right.png');
    this.game.load.image('background', 'assets/img/main/background.png');
    this.game.load.image('ground', 'assets/img/main/ground.png');
    this.game.load.image('level-marker', 'assets/img/main/level-marker.png');
    this.game.load.spritesheet('player-man', 'assets/img/main/player-man.png', 101, 150);
    this.game.load.spritesheet('player-woman', 'assets/img/main/player-woman.png', 101, 150);
    this.game.load.spritesheet('puff', 'assets/img/main/puff.png', 101, 100);
    this.game.load.spritesheet('treasure', 'assets/img/main/folder-clean.png', 61, 43);

    for (let fallingObject of this.game.data.fallingObjects) {
      this.game.load.spritesheet(
        fallingObject.id,
        fallingObject.image,
        fallingObject.width,
        fallingObject.height
      );
    }

    const processObstacles = ( obstacles, suffix ) => {
      for (let obstacle of obstacles) {
        this.game.load.image(obstacle.id + suffix, obstacle.image);
        if (obstacle.character) {
          this.game.load.spritesheet(obstacle.id + '-character' + suffix,
            obstacle.character.image,
            obstacle.character.width,
            obstacle.character.height
          );
        }
      }
    };

    processObstacles(this.game.data.ledgesLeft, '-left');
    processObstacles(this.game.data.ledgesRight, '-right');
  }

  /**
	 * Create the preload state and continue to main.
	 */
  create () {
    this.game.state.start("Start");
  }
}

export default Preload
