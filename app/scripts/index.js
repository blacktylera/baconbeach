(function(){
game.state.add('playgame', {create:create, update: update});

var background;
var character;
var cursors;
var timer;
var bacon;
var broccoli;
var heart;
var baconGroup;
var broccoliGroup;
var fallingPigGroup;
var heartGroup;
var score = 0;
var scoreText;
var nextBaconSpawn = 0;
var nextBroccoliSpawn = 0;
var nextFallingPigSpawn = 0;
var nextHeartSpawn = 0;
var health = 3;
var takeHealth;
var timeIncrement;
var fallingPig;
var flyingPig;
var heartSprite;


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

    fallingPig = game.add.sprite('fallingPig');

    heart = game.add.sprite('heartSprite');

    //want ground to be right around 0,465?

    character = game.add.sprite(290,465 , 'character');

    baconGroup = game.add.group();
    baconGroup.enableBody = true;
    baconGroup.physicsBodyType = Phaser.Physics.ARCADE;
    baconGroup.createMultiple(1000, 'bacon');
    baconGroup.setAll('checkWorldBounds', true);
    baconGroup.setAll('outOfBoundsKill', true);

    broccoliGroup = game.add.group();
    broccoliGroup.enableBody = true;
    broccoliGroup.physicsBodyType = Phaser.Physics.ARCADE;
    broccoliGroup.createMultiple(1000, 'broccoli');
    broccoliGroup.setAll('checkWorldBounds', true);
    broccoliGroup.setAll('outOfBoundsKill', true);

    fallingPigGroup = game.add.group();
    fallingPigGroup.enableBody = true;
    fallingPigGroup.physicsBodyType = Phaser.Physics.ARCADE;
    fallingPigGroup.createMultiple(1000, 'fallingPig');
    fallingPigGroup.setAll('checkWorldBounds', true);
    fallingPigGroup.setAll('outOfBoundsKill', true);

    heartGroup = game.add.group();
    heartGroup.enableBody = true;
    heartGroup.physicsBodyType = Phaser.Physics.ARCADE;
    heartGroup.createMultiple(1000, 'heartSprite');
    heartGroup.setAll('checkWorldBounds', true);
    heartGroup.setAll('outOfBoundsKill', true);


    //  enable physics on objects
    game.physics.arcade.enable(character);
    character.body.setSize(25, 25, 25, 25);
    game.physics.arcade.enable(bacon);
    game.physics.arcade.enable(broccoli);
    game.physics.arcade.enable(fallingPig);
    game.physics.arcade.enable(heart);
    character.body.collideWorldBounds = true;

    // baconGroup.forEach(function())

    // Bacon Fall

    // bacon.body.gravity.y = 150;
    // bacon.body.collideWorldBounds = false;

    // // Broccoli Fall
    // broccoli.body.gravity.y = 300;
    // broccoli.body.collideWorldBounds = false;

    // fallingPig.body.gravity.y = 600;
    // fallingPig.body.collideWorldBounds = false;

    //  walking
    character.animations.add('left', [0, 1, 2, 3], 10, true);
    character.animations.add('right', [5, 6, 7, 8], 10, true);
    character.animations.add('up', [10, 11, 12, 13], 10, true);
    character.animations.add('down', [15, 16, 17, 18], 10, true);

    //  The score
    scoreText = game.add.text(450, 16, 'Bacon Bits: 0', { fontSize: '32px', fill: '#FF33CC' });
    livesText = game.add.text (450, 45,'Lives:' + health, { fontSize: '32px', fill: '#FF33CC' });

    //  controls
    cursors = game.input.keyboard.createCursorKeys();




 }



function update() {

game.physics.arcade.overlap(character, baconGroup, baconHit, null, this);
game.physics.arcade.overlap(character, broccoliGroup, broccoliHit, null, this);
game.physics.arcade.overlap(character, fallingPigGroup, fallingPigHit, null, this);
game.physics.arcade.overlap(character, heartGroup, heartHit, null, this);

background.y = 0;
background.x = 0;

function broccoliFall () {
  broccoli = broccoliGroup.create((Math.random() * 600), -70, 'broccoli', game.rnd.integerInRange(0, -1));
  broccoli.body.gravity.y = 300;
  broccoli.body.collideWorldBounds = false;
  broccoli.anchor.setTo = (0.5, 0.5);
  broccoli.checkWorldBounds = true;
  broccoli.outOfBoundsKill = true;
  if (score >= 0) {
    timeIncrement = 250;
  }
  if (score >= 5000) {
    timeIncrement = 225;
  }
  if (score >= 10000) {
    timeIncrement = 200;
  }
  if (score >= 10000) {
    timeIncrement = 175;
  }
  if (score >= 15000) {
    timeIncrement = 150;
  }
  if (score >= 20000) {
    timeIncrement = 125;
  }
  if (score >= 25000) {
    timeIncrement = 100;
  }
  if (score >= 30000) {
    timeIncrement = 75;
  }
  nextBroccoliSpawn = game.time.now + timeIncrement;
  console.log(score);
  console.log(timeIncrement);
}

function baconFall () {
  bacon = baconGroup.create((Math.random() * 600), -70, 'bacon', game.rnd.integerInRange(0, -1));
  bacon.body.gravity.y = 100;
  bacon.body.collideWorldBounds = false;
  bacon.anchor.setTo = (0.5, 0.5);
  bacon.checkWorldBounds = true;
  bacon.outOfBoundsKill = true;
  nextBaconSpawn = game.time.now + 400;
}


function fallingPigFall () {
  fallingPig = fallingPigGroup.create((Math.random() * 600), -150, 'fallingPig', game.rnd.integerInRange(0, -1));
  fallingPig.body.gravity.y = 1000;
  fallingPig.body.collideWorldBounds = false;
  fallingPig.anchor.setTo = (0.5, 0.5);
  fallingPig.checkWorldBounds = true;
  fallingPig.outOfBoundsKill = true;
  nextFallingPigSpawn = game.time.now + 50000;
}


function heartFall () {
  heart = heartGroup.create((Math.random() * 600), -70, 'heartSprite', game.rnd.integerInRange(0, -1));
  heart.body.gravity.y = 750;
  heart.body.collideWorldBounds = false;
  heart.anchor.setTo = (0.5, 0.5);
  heart.checkWorldBounds = true;
  heart.outOfBoundsKill = true;
  nextHeartSpawn = game.time.now + 100000;
}


if (game.time.now > nextBaconSpawn) {
    baconFall();
}

if (game.time.now > nextBroccoliSpawn) {
    broccoliFall();
}

if (game.time.now > nextFallingPigSpawn && score >= 500) {
    fallingPigFall();
}

if (game.time.now > nextHeartSpawn && score >= 5000) {
    heartFall();
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


function fallingPigHit (player, fallingPigGroup) {

    fallingPigGroup.kill();
    gulpSound = game.add.audio('gulpsound');
    gulpSound.volume = 0.5;
    gulpSound.loop = false;
    gulpSound.play('');


    score += 500;
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


function heartHit (player, heartGroup) {
    heartGroup.kill();
    health += 1;
    livesText.text = 'Lives: ' + health;
}

})();