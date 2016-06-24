'use strict';

import TextButton from '../gameobjects/TextButton';

/**
 * This class is the core of the game. It manages the game play and is in charge
 * of the render and update loops.
 */
class Main extends Phaser.State {
  init ( character ) {
    this.character = character || 0;
  }

  /**
	 * Create the main game state.
	 */
  create () {
    this.score = 0;
    this.highestLevel = 0;

      // Initialize the physics
    this.initializePhysics();

      // Create non-player world elements
    this.background = this.createBackground();
    this.walls = this.createWalls();
    this.heroes = this.createHeroes();
    this.enemies = this.createEnemies();
    this.ledges = this.createLedges();
    this.treasures = this.createTreasures();
    this.obstacles = this.createObstacles();
    this.platforms = this.createPlatforms();
    this.createLevels();

      // Initialize world objects based on the size of the levels created
    this.initializeWalls();
    this.initializePlatforms();

      // Create the player and initialize the camera
    this.playerTrail = this.game.add.group();
    this.player = this.createPlayer();
    this.initializeCamera();

    this.createHUD();

      // Listen for user interaction
    this.game.input.onDown.add(this.onPointerDown, this);
  }

  /**
	 * Initialize the game world.
	 */
  initializePhysics () {
    this.game.renderer.renderSession.roundPixels = true;

      // Define world size and physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // Create shorcut for accessing arcade physics object
    this.physics = this.game.physics.arcade;
  }

  /**
	 * Create game background.
	 */
  createBackground () {
    const wallWidth = this.game.cache.getImage('wall-left').width;
    const backgroundHeight = this.game.cache.getImage('background').height;
    const background = this.game.add.group();
    const backgroundImage = this.game.add.tileSprite(wallWidth, 0, 564,
      backgroundHeight * 3, 'background', null, background);

    background.fixedToCamera = true;
    background.image = backgroundImage;
      // Temporary hack need to create subclass of group
      // We have to update the background position in post update
      // Otherwise it's updated before the camera and creates a lag
    background._postUpdate = background.postUpdate;
    background.postUpdate = () => {
      background._postUpdate();

      var cameraPercentage = this.game.camera.y / (this.game.world.height - this.game.camera.height);
      var backgroundRange = this.game.camera.height - this.background.image.height;

      this.background.image.y = cameraPercentage * backgroundRange;
    };

    return background;
  }

  createWalls () {
    return this.game.add.group();
  }

  /**
	 * Create the game platforms.
	 */
  createPlatforms () {
    const platforms = this.game.add.group();
    platforms.enableBody = true;
    return platforms;
  }

  /**
	 * Create the treasures.
	 */
  createTreasures () {
    const treasures = this.game.add.group();
    treasures.enableBody = true;
    return treasures;
  }

  createObstacles () {
    const obstacles = this.game.add.group();
    obstacles.enableBody = true;
    return obstacles;
  }

  /**
	 * Create the ledges group. Ledges will be added when the levels
	 * are created.
	 */
  createLedges () {
    const ledges = this.game.add.group();
    ledges.enableBody = true;
    return ledges;
  }

  createHeroes () {
    const heroes = this.game.add.group();
    heroes.enableBody = true;
    return heroes;
  }

  createEnemies () {
    const enemies = this.game.add.group();
    enemies.enableBody = true;
    return enemies;
  }

  /**
	 * Create the game levels.
	 */
  createLevels () {
    const groundHeight = this.game.cache.getImage('ground').height;
    let levelY = 0;

    for (let i = this.game.data.levels.length - 1; i >= 0; i --) {
      const levelData = this.game.data.levels[i];
      levelData.index = i;
      levelData.started = false;
      levelY += this.createLevel(levelData, levelY);
    }

    const worldHeight = levelY + groundHeight + this.game.data.levels[0].ledgeMaxDistance;
    this.game.world.setBounds(0, 0, this.game.width, worldHeight);
  }

  createLevel ( data, startY ) {
    const generateRandomLedgeIdPool = () => {
      const ledgePool = [];
      for (let ledge of data.ledges) {
        for (let count = 0; count < ledge.ratio; count ++) {
          ledgePool.push(ledge.id);
        }
      }
      return this.shuffleArray(ledgePool);
    };

    const ledgeDistance = () => {
      return this.game.rnd.integerInRange(
        data.ledgeMinDistance,
        data.ledgeMaxDistance
      );
    };

    const createLedge = ( ledgesData, suffix ) => {
      if ((!ledgePool) || (!ledgePool.length)) {
        ledgePool = generateRandomLedgeIdPool();
      }
      const ledgeId = ledgePool.shift();
      const ledgeImageId = ledgeId + suffix;
      const ledgeImage = this.game.cache.getImage(ledgeImageId);
      const ledgeData = this.find(ledgesData, this.selectById(ledgeId));
      let character;

      if ((ledgeData) && (ledgeData.character)) {
        const characterImageId = ledgeId + '-character' + suffix;
        const group = ledgeData.character.isGood ? this.heroes : this.enemies;
        character = group.create(0, 0, characterImageId);
        character.anchor.setTo(ledgeData.character.anchorX,
          ledgeData.character.anchorY);
        character.body.immovable = true;
        character.points = ledgeData.character.points;
        character.animations.add('idle', [0, 1]);
        character.animations.play('idle', 5, true);
      }

      const ledge = this.ledges.create(0, 0, ledgeImageId);
      ledge.body.immovable = true;

      return {ledge: ledge, character: character, data: ledgeData};
    };

    let ledgeLeftY = startY;
    let ledgeRightY = startY;
    let ledgePool;
    while ((ledgeLeftY < startY + data.height) && (ledgeRightY < startY + data.height)) {
      const {
        ledge: ledgeLeft,
        character: characterLeft,
        data: dataLeft
      } = createLedge(this.game.data.ledgesLeft, '-left');
      const {
        ledge: ledgeRight,
        character: characterRight,
        data: dataRight
      } = createLedge(this.game.data.ledgesRight, '-right');

      ledgeLeftY += ledgeLeft.height + ledgeDistance();
      ledgeRightY += ledgeRight.height + ledgeDistance();

      ledgeLeft.y = ledgeLeftY;
      ledgeRight.x = this.game.world.width - ledgeRight.width;
      ledgeRight.y = ledgeRightY;

      if (characterLeft) {
        characterLeft.x = ledgeLeft.x + (dataLeft.character.offsetX || 0);
        characterLeft.y = ledgeLeft.y + (dataLeft.character.offsetY || 0);
      }

      if (characterRight) {
        characterRight.x = this.game.world.width - (dataRight.character.offsetX || 0);
        characterRight.y = ledgeRight.y + (dataRight.character.offsetY || 0);
      }
    }

    const levelHeight = Math.max(ledgeLeftY, ledgeRightY) - startY;

    const levelMarker = this.game.add.sprite(0, startY, 'level-marker');
    levelMarker.x = (this.game.world.width - levelMarker.width) / 2;

    const labelText = "Level " + (data.index + 1);
    const label = this.game.add.text(0, startY + 15, labelText, {
      fill: "#ffffff",
      font: "36px Arial"
    });
    label.x = (this.game.world.width - label.width) / 2;

    data.y = startY;
    data.actualHeight = levelHeight;

    return levelHeight;
  }

  initializeWalls () {
    const wallWidth = this.game.cache.getImage('wall-left').width;
    const leftWall = this.game.add.tileSprite(0, 0, wallWidth,
      this.game.world.height, 'wall-left', null, this.walls);
    const rightWall = this.game.add.tileSprite(this.game.world.width - wallWidth,
      0, wallWidth, this.game.world.height, 'wall-right', null, this.walls);
  }

  initializePlatforms () {
    const groundX = 0;
    const groundY = this.game.world.height;
    const ground = this.platforms.create(groundX, groundY, 'ground');
    ground.anchor.setTo(0, 1);
    ground.body.immovable = true;

    const directions = this.game.add.text(74, this.game.world.height - 334, this.game.data.basePanel.directions, {
      align: 'center',
      fill: "#000000",
      font: "24px Arial",
      wordWrap: true,
      wordWrapWidth: 332
    });
    directions.lineSpacing = -4;

    this.changeCharacterButton = new TextButton(this.game, 80, this.game.world.height - 78, this.game.data.basePanel.changeCharacterBtn, 0x0F5EA3, 292);
    this.changeCharacterButton.onInputDown.add(this.changeCharacter, this);
    this.game.world.add(this.changeCharacterButton);

    this.aboutButton = new TextButton(this.game, 440, this.game.world.height - 78, this.game.data.basePanel.aboutGameBtn, 0x0F5EA3, 160);
    this.aboutButton.onInputDown.add(this.showAboutGame, this);
    this.game.world.add(this.aboutButton);

    this.platforms.ground = ground;
  }

  /**
	 * Create the player.
	 */
  createPlayer () {
    const groundHeight = this.game.cache.getImage('ground').height;
    const playerX = this.game.world.centerX / 2;
    const playerY = this.game.world.height - groundHeight - 200;
    const player = this.game.add.sprite(
      playerX,
      playerY,
      this.character === 0
        ? 'player-man'
        : 'player-woman'
    );
    this.physics.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.body.setSize(76, 132, 0, 0);
    player.body.velocity.x = this.game.data.playerVelocityX;
    player.body.gravity.y = this.game.data.gravityY;
    player.body.bounce.y = this.game.data.playerBounceY;

    player.animations.add('idle', [0, 1]);
    player.animations.add('powerup', [2, 3]);
    player.animations.play('idle', 5, true);

    return player;
  }

  /**
	 * Initialize the camera.
	 */
  initializeCamera () {
    const deadzoneX = 0;
    const deadzoneY = 300;
    const deadzoneWidth = this.game.width;
    const deadzoneHeight = this.game.height - 800;

    this.game.camera.follow(this.player);
    this.game.camera.deadzone = new Phaser.Rectangle(
      deadzoneX,
      deadzoneY,
      deadzoneWidth,
      deadzoneHeight
    );
  }

  /**
	 * Create the heads up display.
	 */
  createHUD () {
    const hud = this.game.add.group();
    const background = this.game.add.graphics(0, 0, hud);

    background.beginFill(0x1c596b);
    background.drawRect(0, 0, this.game.data.width, 60);
    background.endFill();

    this.scoreText = this.game.add.text(30, 12, "", {
      fill: "#fcac17",
      font: "bold 30px Arial"
    }, hud);
    this.levelText = this.game.add.text(30, 12, "", {
      fill: "#fcac17",
      font: "bold 30px Arial"
    }, hud);

    this.updateScoreDisplay();
    hud.fixedToCamera = true;

    return hud;
  }

  /**
	 * Listen for mouse down and tap events.
	 */
  onPointerDown ( pointer, e ) {
    if ((this.changeCharacterButton.input.pointerOver())
    || (this.aboutButton.input.pointerOver())) {
      return;
    }

    let velocityY = this.player.body.velocity.y - this.game.data.playerVelocityBoostY;
    velocityY = Math.max(velocityY, -this.game.data.playerMaxVelocityY);
    velocityY = Math.min(velocityY, -this.game.data.playerVelocityBoostY);
    this.player.body.velocity.y = velocityY;

    const trail = this.playerTrail.create(this.player.x, this.player.y, 'puff');
    trail.anchor.setTo(.5, .5);
    const trailTween = this.game.add.tween(trail.scale);
    trailTween.onComplete.add(() => {
      trail.destroy();
    });

    trailTween.to({x: 0, y: 0}, 500, Phaser.Easing.Quadratic.InOut)
      .start();

    if (!this.game.device.webAudio) {
      this.game.boostFx.play();
    } else {
      this.game.soundFx.play('boost');
    }
  }

  /**
	 * Update loop.
	 */
  update () {
    const wallWidth = this.game.cache.getImage('wall-left').width;
    let isGameOver = false;

    const collectTreasure = ( player, treasure ) => {
      treasure.body.enable = false;

      const treasureTween = this.game.add.tween(treasure.scale);
      treasureTween.onComplete.add(() => {
        treasure.destroy();
      });

      treasureTween.to({x: 0, y: 0}, 500, Phaser.Easing.Quadratic.Out)
        .start();

      this.score += treasure.points || 1;
      this.updateScoreDisplay();

      if (treasure.isPowerUp) {
        this.player.animations.play('powerup', 5, true);
        this.player.powerUp = true;
        this.player.powerUpEnding = false;
        this.player.powerUpStartTime = this.game.time.totalElapsedSeconds();
        this.game.soundFx.play('star');
      } else {
        this.game.soundFx.play('treasure');
      }
    };

    if (this.player.powerUp) {
      const elapsedTime = this.game.time.totalElapsedSeconds() - this.player.powerUpStartTime;
      if (elapsedTime >= 10) {
        this.player.powerUp = false;
        this.player.animations.play('idle', 5, true);
      } else if ((!this.player.powerUpEnding) && (elapsedTime >= 8)) {
        this.player.powerUpEnding = true;
        this.player.animations.stop();
        this.player.animations.play('powerup', 10, true);
      }
    }

    for (let treasure of this.treasures.children) {
      treasure.body.velocity.x += this.game.rnd.integerInRange(-5, 5);
      treasure.body.velocity.x = Math.min(50, treasure.body.velocity.x);
      treasure.body.velocity.x = Math.max(-50, treasure.body.velocity.x);

      if (treasure.x < treasure.startX - 20) {
        treasure.body.velocity.x = Math.abs(treasure.body.velocity.x);
      } else if (treasure.x > treasure.startX + 20) {
        treasure.body.velocity.x = -Math.abs(treasure.body.velocity.x);
      }
    }

    for (let obstacle of this.obstacles.children) {
      obstacle.body.velocity.x += this.game.rnd.integerInRange(-5, 5);
      obstacle.body.velocity.x = Math.min(50, obstacle.body.velocity.x);
      obstacle.body.velocity.x = Math.max(-50, obstacle.body.velocity.x);

      if (obstacle.x < obstacle.startX - 20) {
        obstacle.body.velocity.x = Math.abs(obstacle.body.velocity.x);
      } else if (obstacle.x > obstacle.startX + 20) {
        obstacle.body.velocity.x = -Math.abs(obstacle.body.velocity.x);
      }
    }

    this.physics.collide(this.player, this.platforms);
    this.physics.overlap(this.player, this.treasures, collectTreasure);
    this.physics.overlap(this.player, this.heroes, collectTreasure);

    if (this.player.powerUp) {
      // Plyaer should be invincible to ledges as well
      //isGameOver = this.physics.collide(this.player, this.ledges);
      this.physics.overlap(this.player, this.obstacles, collectTreasure);
      this.physics.overlap(this.player, this.enemies, collectTreasure);
    } else {
      isGameOver = this.physics.collide(this.player, this.ledges)
        || this.physics.collide(this.player, this.obstacles)
        || this.physics.collide(this.player, this.enemies);
    }

      // If the player has collided with a ledge or obstacle
    if (isGameOver) {
      this.game.soundFx.play('obstacle');
      this.gameOver();
    } else {
      if (this.player.body.right >= this.game.world.width - wallWidth) {
        this.player.body.velocity.x = -this.game.data.playerVelocityX;
        this.player.scale.x = -1;
        this.playWallFx();
      } else if (this.player.body.x <= wallWidth) {
        this.player.body.velocity.x = this.game.data.playerVelocityX;
        this.player.scale.x = 1;
        this.playWallFx();
      }

      for (let levelData of this.game.data.levels) {
        if ((!levelData.started) && (this.player.y <= levelData.y + levelData.actualHeight)) {
          this.startLevel(levelData.index);
          break;
        }
      }
    }
  }

  playWallFx () {
    if (!this.game.device.webAudio) {
      this.game.wallFx.play();
    } else {
      this.game.soundFx.play('wall');
    }
  }

  startLevel ( index ) {
    const wallBuffer = this.game.cache.getImage('wall-left').width * 2;
    const levelData = this.game.data.levels[index];

    this.highestLevel = index;
    levelData.started = true;
    this.updateScoreDisplay();

    if (levelData.fallingObjects) {
      for (let fallingObject of levelData.fallingObjects) {
        const fallingObjectData = this.find(
          this.game.data.fallingObjects,
          this.selectById(fallingObject.id)
        );
        for (let i = 0; i < fallingObject.count; i ++) {
          const treasureX = this.game.rnd.integerInRange(
            wallBuffer,
            this.game.world.width - wallBuffer
          );
          const treasureY = this.game.rnd.integerInRange(
            levelData.y - this.game.data.height,
            levelData.y + levelData.actualHeight - this.game.data.height
          );
          const group = fallingObjectData.isGood ? this.treasures : this.obstacles;
          let treasure = group.create(treasureX, treasureY, fallingObject.id);
          treasure.anchor.setTo(.5, .5);
          treasure.body.velocity.y = 60;
          treasure.startX = treasureX;
          treasure.isPowerUp = fallingObjectData.isPowerUp;
          treasure.points = fallingObjectData.points;
          treasure.animations.add('idle', [0, 1]);
          treasure.animations.play('idle', 5, true);
        }
      }
    }
  }

  /**
	 * Update the score display.
	 */
  updateScoreDisplay () {
    this.scoreText.text = 'Score: ' + this.score;
    this.levelText.text = 'Level: ' + (this.highestLevel || 1);
    this.levelText.x = this.game.world.width - this.scoreText.x - this.levelText.width;
  }

  /**
	 * Render loop.
	 */
  render () {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  }

  changeCharacter () {
    this.game.soundFx.play('hero-select');
    this.game.state.start("CharacterSelection", true, false, this.character);
  }

  showAboutGame () {
    this.game.state.start("About", true, false, this.character);
  }

  /**
	 * End the current game.
	 */
  gameOver () {
    const level = Math.max(this.highestLevel, 1);
    this.game.state.start("GameOver", true, false, this.character, this.score, level);
  }

  shuffleArray ( array ) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

  filter ( array, callback ) {
    const filtered = [];
    for (let element of array) {
      if (callback(element)) {
        filtered.push(element);
      }
    }
    return filtered;
  }

  find ( array, callback ) {
    for (let element of array) {
      if (callback(element)) {
        return element;
      }
    }
    return null;
  }

  selectById ( id ) {
    return ( value ) => {
      return value.id === id;
    };
  }
}

export default Main
