var beachTheme;

(function(){

  game.state.add('menu', {preload:preload, create:create});
  game.state.start('menu');

  function preload(){
    game.load.image('bacon', 'scripts/bacon.png');
    game.load.image('broccoli', 'scripts/broccoli.png');
    game.load.image('background', 'scripts/backgroundstatic.png');
    game.load.image('character', 'scripts/pixelavatar96.png', 32, 48);
    game.load.image('menu', 'scripts/baconbeachmenu.png');
    game.load.audio('beachtheme', 'scripts/beachtheme.m4a');
    game.load.audio('gulpsound', 'scripts/gulpsound.m4a');
  }

  function create(){
    beachTheme = game.add.audio('beachtheme');
    beachTheme.volume = 0.4;
    beachTheme.loop = true;
    beachTheme.play('');
    game.add.sprite(0, 0, 'menu');
    character = game.add.sprite(290,-10, 'character');
    game.physics.arcade.enable(character);
    character.body.bounce.y = 0.5;
    character.body.gravity.y = 500;
    character.body.collideWorldBounds = true;


    var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(playGame);
  }

  function playGame() {
    this.game.state.start('playgame');
  }
})();