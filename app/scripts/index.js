var game = new Phaser.Game(800, 674, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });
var bacon;
var background;
function preload() {

    game.stage.backgroundColor = '#71c5cf';
    game.load.image('bacon', 'scripts/bacon.png');
    game.load.image('broccoli', 'scripts/broccoli.png');
    game.load.image('background', 'scripts/backgroundstatic.png');
    game.load.image('character', 'scripts/pixelavatar96.png', 32, 48);



}

var platforms;

function create() {
	console.log('hello');

    //  Enable Arcade Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Game Background
    background = game.add.sprite(0, 0, 'background');
    bacon = game.add.sprite(0, 0, 'bacon');

 }


function update() {


}