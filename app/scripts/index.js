(function(){
game.state.add('playgame', {create:create, update: update});

var background;
var character;
var cursors;
var timer;
var bacon;
var broccoli;
var baconGroup;
var broccoliGroup;
var score = 0;
var scoreText;
var nextBaconSpawn = 0;
var nextBroccoliSpawn = 0;
var health =3;
var takeHealth;


function create() {
	console.log('hello');

    //  Enable Arcade Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Game Background
    background = game.add.sprite(0, 0, 'background');
    //  Game Bacon
    bacon = game.add.sprite('bacon');
    //  Game Broccoli
    broccoli = game.add.sprite('broccoli');

    //want ground to be right around 0,465?

    character = game.add.sprite(290,465 , 'character');

    baconGroup = game.add.group();
    baconGroup.enableBody = true;
    baconGroup.physicsBodyType = Phaser.Physics.ARCADE;
    baconGroup.createMultiple(100, 'bacon');
    baconGroup.setAll('checkWorldBounds', true);
    baconGroup.setAll('outOfBoundsKill', true);

    broccoliGroup = game.add.group();
    broccoliGroup.enableBody = true;
    broccoliGroup.physicsBodyType = Phaser.Physics.ARCADE;
    broccoliGroup.createMultiple(100, 'broccoli');
    broccoliGroup.setAll('checkWorldBounds', true);
    broccoliGroup.setAll('outOfBoundsKill', true);


    //  enable physics on objects
    game.physics.arcade.enable(character);
    game.physics.arcade.enable(bacon);
    game.physics.arcade.enable(broccoli);
    character.body.collideWorldBounds = true;

    // baconGroup.forEach(function())

    // Bacon Fall

    bacon.body.gravity.y = 150;
    bacon.body.collideWorldBounds = false;

    // Broccoli Fall
    broccoli.body.gravity.y = 300;
    broccoli.body.collideWorldBounds = false;

    //  walking
    character.animations.add('left', [0, 1, 2, 3], 10, true);
    character.animations.add('right', [5, 6, 7, 8], 10, true);
    character.animations.add('up', [10, 11, 12, 13], 10, true);
    character.animations.add('down', [15, 16, 17, 18], 10, true);

    //  The score
    scoreText = game.add.text(450, 16, 'Bacon Bits: 0', { fontSize: '32px', fill: '#000' });
    livesText = game.add.text (450, 45,'Lives:' + health, { fontSize: '32px', fill: '#000' });

    //  controls
    cursors = game.input.keyboard.createCursorKeys();




 }



function update() {

game.physics.arcade.overlap(character, baconGroup, baconHit, null, this);
game.physics.arcade.overlap(character, broccoliGroup, broccoliHit, null, this);
background.y = 0;
background.x = 0;

function broccoliFall () {
  broccoli = broccoliGroup.create((Math.random() * 600), -70, 'broccoli', game.rnd.integerInRange(0, -1));
  broccoli.body.gravity.y = 300;
  broccoli.body.collideWorldBounds = false;
  broccoli.anchor.setTo = (0.5, 0.5);
  broccoli.checkWorldBounds = true;
  broccoli.outOfBoundsKill = true;
  nextBroccoliSpawn = game.time.now + 350;
}

function baconFall () {
  bacon = baconGroup.create((Math.random() * 600), -70, 'bacon', game.rnd.integerInRange(0, -1));
  bacon.body.gravity.y = 100;
  bacon.body.collideWorldBounds = false;
  bacon.anchor.setTo = (0.5, 0.5);
  bacon.checkWorldBounds = true;
  baconoutOfBoundsKill = true;
  nextBaconSpawn = game.time.now + 400;
}

if (game.time.now > nextBaconSpawn) {
    baconFall();
}

if (game.time.now > nextBroccoliSpawn) {
    broccoliFall();
}

function getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min;
}


// Left and right movement
character.body.velocity.x = 0;


if (cursors.left.isDown)
{

    character.body.velocity.x = -550;

    character.animations.play('left');
}
else if (cursors.right.isDown)
{

    character.body.velocity.x = 550;

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

    character.body.velocity.y = -550;

    character.animations.play('up');
}
else if (cursors.down.isDown)
{

    character.body.velocity.y = 550;

    character.animations.play('down');
}
else
{

    character.animations.stop();

    character.frame = 1;
}
}

function baconHit (player, baconGroup) {

    baconGroup.kill();
    gulpSound = game.add.audio('gulpsound');
    gulpSound.volume = 0.5;
    gulpSound.loop = false;
    gulpSound.play('');


    score += 100;
    scoreText.text = 'Bacon Bits: ' + score;

}

function broccoliHit (player, broccoliGroup) {
    broccoliGroup.kill();
    awMan = game.add.audio('awman');
    awMan.volume = 0.5;
    awMan.loop = false;
    awMan.play('');
    health -= 1;
    livesText.text = 'Lives: ' + health;
    if (health <=0 )
    {
    alert('Death by Fiber. Gnarley, brah.');
    location.reload();
    }
}


})();