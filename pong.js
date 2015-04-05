// create canvas
var canvas    		= document.createElement("canvas");
var ctx 	  		= canvas.getContext("2d");
canvas.id 	  		= "pong_table";
canvas.width  		= 512;
canvas.height 		= 380;
canvas.style.border = "3px solid #365B84";
canvas.style.background = "#142335";
document.body.appendChild(canvas);


// player1 object
var player1 = {
	speed: 7,
	y: 0,
	points: 0
};

// player2 object
var player2 = {
	speed: 7,
	y: 0,
	points: 0
};

// ball object
var ball = {
	speed_x : 0,
	speed_y : 0,
	x: 0,
	y: 0
};

// keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// reset game
var reset  = function () {
	player1.y = 185;
	player2.y = 185;
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.x = 256;
 	ball.y = 240;
 	var rand = 	function(){ 
 					if (Math.random() < 0.5) return Math.floor(Math.random()*5 + 1);
					else return (Math.floor(Math.random()*5) + 1) * -1;
				}
 	ball.speed_x = rand();
 	ball.speed_y = rand();
};

// update
var update = function () {
	// move player1
	// TODO: Don't allow that bars cross over walls
	if (83 in keysDown) {
		player1.y += player1.speed;
	}
	if (87 in keysDown) {
		player1.y -= player1.speed;
	}

	// move player2
	// TODO: Don't allow that bars cross over walls
	if (40 in keysDown) {
		player2.y += player2.speed;
	}
	if (38 in keysDown) {
		player2.y -= player2.speed;
	}

	//move ball
	ball.x += ball.speed_x;
	ball.y += ball.speed_y;
	
	//LOGICS
	// pong player1 
	// TODO: change speed a little when hit
	if ((ball.x <= 26) && (ball.y >= player1.y) && (ball.y <= (player1.y + 52))) {
		ball.speed_x *= -1;		
		console.log("hit");
	}
	// pong player2
	// TODO: change speed a little when hit
	if ((ball.x >= 486) && (ball.y >= player2.y) && (ball.y <= (player2.y + 52))) {
		ball.speed_x *= -1;
		console.log("hit");
	}

	// walls
	// TODO: Score
	if (ball.y <= 3 || ball.y >= 377) ball.speed_y *= -1;
	if (ball.x <= 3 || ball.x >= 512) reset();
};

// render
var render = function () {
	// erase canvas
	ctx.beginPath();
	ctx.fillStyle = '#142335'
	ctx.fillRect(0, 0, 512, 496);
	ctx.border = '0';
	ctx.stroke();

	// draw player 1 and 2
	ctx.beginPath();
	ctx.fillStyle = '#84277F'; //My girlfriend wanted her bar pink ¬¬
	ctx.fillRect( 10, 0 + player1.y, 10, 52);
	 ctx.stroke();
	ctx.fillStyle = '#365B84';
	ctx.fillRect(492, 0 + player2.y, 10, 52);
    ctx.stroke();

    // draw ball
	ctx.beginPath();
	ctx.arc(ball.x , ball.y, 7, 0, 2 * Math.PI);
	ctx.fillStyle = '#497CB7';
	ctx.fill();
	ctx.stroke();
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame 	  || 
						w.webkitRequestAnimationFrame || 
						w.msRequestAnimationFrame 	  || 
						w.mozRequestAnimationFrame;

// play function
var play = function() {
	console.log("Playing!");
	reset();
	main();
}

// The main game loop
var main = function () {
	update();
	render();

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// create button
// TODO: Something is wrong here. The game starts by itself and doesn't wait until the button is pressed
var p 		= document.createElement("p");
document.body.appendChild(p);
var button  = document.createElement("button");
button.id 	= "Start";
button.innerHTML = "Start!";
document.body.appendChild(button);

var b = document.getElementById("Start");
b.onclick = play();
















