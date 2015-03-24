(function(){
game.state.add('playgame', {create:create, update: update});

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

    character = game.add.sprite(290,465 , 'character');

    //  enable physics on objects
    game.physics.arcade.enable(character);
    game.physics.arcade.enable(bacon);
    game.physics.arcade.enable(broccoli);
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
    character.animations.add('up', [10, 11, 12, 13], 10, true);
    character.animations.add('down', [15, 16, 17, 18], 10, true);

    //  The score
    scoreText = game.add.text(450, 16, 'Bacon Bits: 0', { fontSize: '32px', fill: '#000' });

    //  controls
    cursors = game.input.keyboard.createCursorKeys();




 }



function update() {

    game.physics.arcade.overlap(character, bacon, baconHit, null, this);
    game.physics.arcade.overlap(character, broccoli, broccoliHit, null, this);
    background.y = 0;
    background.x = 0;


    // Left and right movement
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
    //  Upward and downward movement
    character.body.velocity.y = 0;
    // character.body.height.y = 0;

    if (cursors.up.isDown && character.y >= 388)
    {

        character.body.velocity.y = -350;

        character.animations.play('up');
    }
    else if (cursors.down.isDown)
    {

        character.body.velocity.y = 350;

        character.animations.play('down');
    }
    else
    {

        character.animations.stop();

        character.frame = 1;
    }
}

function baconHit (player, bacon) {


    bacon.kill();
    gulpSound = game.add.audio('gulpsound');
    gulpSound.volume = 0.5;
    gulpSound.loop = false;
    gulpSound.play('');


    score += 100;
    scoreText.text = 'Score: ' + score;

}

function broccoliHit (player, broccoli) {
    broccoli.kill();
    awMan = game.add.audio('awman');
    awMan.volume = 0.5;
    awMan.loop = false;
    awMan.play('');
    var health = 3;
    health -= 1;
    if (health <=0 )
    {
    alert('Death by Fiber. Gnarley, brah.');
    }
}


})();