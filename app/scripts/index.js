var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('bacon', '../assets/bacon.png');
    game.load.image('broccoli', '../assets/broccoli.png');
    game.load.image('background', '../assets/backgroundstatic.png');
    game.load.image('character', '../assets/pixelavatar96.png', 32, 48);


    game.stage.backgroundColor = '#71c5cf';
}

var platforms;

function create() {
	console.log('hello');

    //  Enable Arcade Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Game Background
    game.add.sprite(0, 0, 'background');
    game.add.sprite(0, 0, 'bacon');

 }


function update() {


}