var game = new Phaser.Game(681, 574, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('bacon', 'scripts/bacon.png');
    game.load.image('broccoli', 'scripts/broccoli.png');
    game.load.image('background', 'scripts/backgroundstatic.png');
    game.load.image('character', 'scripts/pixelavatar96.png', 32, 48);



}

var background;
var character;
var cursors;

var bacon;
var broccoli;
var score = 0;
var scoreText;

function create() {
	console.log('hello');

    //  Enable Arcade Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Game Background
    background = game.add.sprite(0, 0, 'background');
    //  Game Bacon
    bacon = game.add.sprite(0, 0, 'bacon');
    //  Game Broccoli
    broccoli = game.add.sprite(250,25, 'broccoli');

    //want ground to be right around 0,465?

    character = game.add.sprite(290,465, 'character');

    //  enable physics on objects
    game.physics.arcade.enable(character);
    game.physics.arcade.enable(bacon);
    game.physics.arcade.enable(broccoli);

    //  jump?
    character.body.bounce.y = 0.2;
    character.body.gravity.y = 300;
    character.body.collideWorldBounds = true;

    // Bacon Fall

    bacon.body.gravity.y = 150;
    bacon.body.collideWorldBounds = false;

    // Broccoli Fall
    broccoli.body.gravity.y = 150;
    broccoli.body.collideWorldBounds = false;

    //  walking
    character.animations.add('left', [0, 1, 2, 3], 10, true);
    character.animations.add('right', [5, 6, 7, 8], 10, true);

    //  The score
    scoreText = game.add.text(450, 16, 'Bacon Bits: 0', { fontSize: '32px', fill: '#000' });

    //  controls
    cursors = game.input.keyboard.createCursorKeys();




 }



function update() {

    game.physics.arcade.overlap(character, bacon, baconHit, null, this);
    game.physics.arcade.overlap(character, broccoli, broccoliHit, null, this);

    character.body.velocity.x = 0;

    if (cursors.left.isDown)
    {

        character.body.velocity.x = -350;

        character.animations.play('left');
    }
    else if (cursors.right.isDown)
    {

        character.body.velocity.x = 350;

        character.animations.play('right');
    }
    else
    {

        character.animations.stop();

        character.frame = 1;
    }
    //  Jumping
    if (cursors.up.isDown && character.body.velocity.y)
    {
        character.body.velocity.y = -100;
    }

}

function baconHit (player, bacon) {


    bacon.kill();


    score += 100;
    scoreText.text = 'Score: ' + score;

}

function broccoliHit (player, broccoli) {

    broccoli.kill();

    score -= 100;
    scoreText.text = 'Score: ' + score;

}