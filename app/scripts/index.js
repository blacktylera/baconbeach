var game = new Phaser.Game(681, 574, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });
var background;
var character;
function preload() {

    game.stage.backgroundColor = '#71c5cf';
    game.load.image('bacon', 'scripts/bacon.png');
    game.load.image('broccoli', 'scripts/broccoli.png');
    game.load.image('background', 'scripts/backgroundstatic.png');
    game.load.image('character', 'scripts/pixelavatar96.png', 32, 48);



}

var platforms;
var player;
var platforms;
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
    // Game Bacon
    bacon = game.add.sprite(0, 0, 'bacon');
    //Game Broccoli
    broccoli = game.add.sprite(250,25, 'broccoli');
    //Game character
    character = game.add.sprite(290,465, 'character');


 }


function update() {


}