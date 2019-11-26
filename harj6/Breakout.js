/** 
 *  Pasi Manninen, 28.8.2013 
 *  - simple breakout game in HTML5 canvas with animation using requestrAnimFram
 */
var canvas;		// canvas
var ctx;		// canvas context
var ball;		// ball object
var paddle;		// paddle object
var blocks;		// array of blocks
var gameOver;	// is game over
var gameStart;  // game startting time
var allDone;	// all blocks destroyed
var gameCount = 0;  // how many games is played
//audiot
var osuma = new Audio("audio/Pop.mp3");
var peliLoppu = new Audio("audio/Loppu.mp3");
var voitto = new Audio("audio/Voitto.mp3");
var text;

// perform an animation and requests that the browser call a specified 
// function to update an animation before the next repaint
window.requestAnimFrame = 
	window.requestAnimationFrame       ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};

// init
function init() {
	// find the <canvas> element
	canvas  = document.getElementById("myCanvas");
	// get canvas context
	ctx = canvas.getContext("2d");
	// game objects
	ball = new Ball(canvas,ctx);
	paddle = new Paddle(canvas,ctx);
	paddle.draw();
	// blocks
	createBlocks();
}



// start game
function start_game() {
	// if not first game, init again
	if (gameCount > 0) init();
	// disable start button
	var element = document.getElementById("startButton");
	element.disabled = true;
	// listen mouse to move paddle
	canvas.addEventListener('mousemove', movePaddle, false);
	// game is on
	gameOver = false;
	// not allDone, there is new blocks to destroy
	allDone = false;	
	// game starting time
	gameStart = new Date(); 
	// increase game count
	gameCount++;
	// animate
	requestAnimationFrame(draw);
}

// move paddle with mouse
function movePaddle(event){
	var rect = canvas.getBoundingClientRect();
	var mouseXpos = event.clientX - rect.left;
	paddle.move(mouseXpos);
	paddle.draw();
}

// clear screen
function clear() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

// draw game
function draw() {
	// clear
	clear();
	// game objects
	ball.draw();
	// if ball is below paddle -> game is over (sorry only one ball here...)
	gameOver = ball.move();
	paddle.draw();
	drawBlocks();
	// collision
	checkCollisions();
	// show playing time
	showPlayingTime();
	// request new frame
	if (!gameOver && !allDone) requestAnimFrame(draw);
	// game over, end game
	else {
		endGame();
	}
}

// end game, remove listeners and enable start a new game -button
function endGame() {
    peliLoppu.play();
	// remove paddle moving
	canvas.removeEventListener('mousemove', movePaddle, false);
	// enable start button
	var element = document.getElementById("startButton");
	element.disabled = false;
}

// show playing time
function showPlayingTime() {
	var timeNow = new Date();
	var seconds = Math.round((timeNow-gameStart)/1000);
	ctx.fillStyle="#000000";
	ctx.font = "15px Verdana";
	ctx.fillText("Time elapsed: "+seconds+"s",10,790);
}

// check collisions
function checkCollisions() {
	// ball hits to paddle
	if (hitTest(ball.x,ball.y,ball.w,ball.w,paddle.x,paddle.y,paddle.w,paddle.h)) {
		var ballPosition = ball.x - paddle.x;
		var hitPercent = (ballPosition/(paddle.w-ball.w))-0.5;
		ball.setBallSpeed(hitPercent);
	}
	// ball hits to block
	for (var i=0;i<blocks.length;i++) {
		if (hitTest(ball.x,ball.y,ball.w,ball.w,blocks[i].x,blocks[i].y,blocks[i].w,blocks[i].h)) {
			ball.ballHitsBlock();
			blocks.splice(i,1); // Poistaa i:nnen blockin taulukosta
            osuma.play();
			// all blocks gone
			if (blocks.length == 0) {
				// next level or something...
				//console.log("All blocks destroyed!");
				var endTime = new Date();
                voitto.play();
				addHighScore(endTime);
			}
			break;
		}
	}
	
}

// add a new highscore
function addHighScore(endTime) {
	// end game
	endGame();
	// clear canvas
	clear();
	// all done in this level
	allDone = true;
	// show text
	var seconds = Math.round((endTime-gameStart)/1000);
	ctx.fillStyle="#000000";
	ctx.font = "30px Verdana";
	ctx.fillText("Level Complete!",70,400);
	ctx.fillText("Time elapsed: "+seconds+"s",70,450);
}

// hit test between to objects
function hitTest(x1, y1, w1, h1, x2, y2, w2, h2) {
    w2 += x2;
    w1 += x1;
    if (x2 > w1 || x1 > w2) return false;
    h2 += y2;
    h1 += y1;
    if (y2 > h1 || y1 > h2) return false;
	return true;
}

// draw blocks to canvase
function drawBlocks() {
	for (var i=0;i<blocks.length;i++) {
		blocks[i].draw();
	}
}

// create block objects
function createBlocks() {
	// blocks init values
	var BLOCKS = 72;
	var COLS = 6;
	var X_START_POS = 30;
	var Y_START_POS = 30;
	var STEP = 2;
	// array for blocks
	blocks = new Array();
	// handle positioning
	var row = 0;
	var col = 0;
	// createa blocks
	for (var i=0;i<BLOCKS;i++) {
		// is it a new row
		if (i%COLS==0 && i>0) {
			row++;
			col=0;
		} else if (i > 0){
			col++;
		}
		// block position
		var x = (50+STEP)*col+X_START_POS;
		var y = (20+STEP)*row+Y_START_POS;
		// a new block
		var block = new Block(ctx,x,y);		
		// add to array
		blocks.push(block);
	}
}