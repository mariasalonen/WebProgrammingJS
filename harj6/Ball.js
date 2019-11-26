// Ball.js
function Ball(canvas,ctx) {
	this.canvas = canvas;
	this.ctx = ctx;
	this.color = "#fff";
	this.xspeed = Math.random() < 0.5 ? 4 : -4;
	this.yspeed = -4;
	this.x = canvas.width/2;
	this.y = canvas.height-100;
	this.r = 10;
	this.w = 10;
	this.canvasWidth = canvas.width;
	this.canvasHeight = canvas.height;

    
	// draw a ball
	this.draw = function() {
             
    ctx.fill();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		ctx.fill();
	}
	
	// move a ball
	this.move = function() {
		this.x += this.xspeed;
		this.y += this.yspeed;
		if (this.x <= 0 || (this.x+this.w) > this.canvasWidth) this.xspeed *= -1;
		else if (this.y <= 0) this.yspeed *= -1;
		else if (this.y > this.canvasHeight) {
			return true;
		}
		return false;
	}
	
	// set ball speed
	this.setBallSpeed = function(hitPercent) {
      // vasemmasta laidasta: xspeed: noin -6,1
      // oikeasta laidasta: xspeed: noin 6,1
		this.xspeed = hitPercent*10;
		this.yspeed *= -1;

		console.log(this.xspeed);

	}
	
	// ball has hit to a block
	this.ballHitsBlock = function() {
		this.yspeed *= -1; 
	}
}