var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var move = 1;
var lowest = 0;
//Classes
function Enemy(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = move;
	this.state = 1;

	this.update = function(){
		this.dx = move;
		this.x += this.dx;
		for(var i = 0; i < shots.length; i++){
			if(shots[i].x > this.x - this.r && shots[i].x < this.x + this.r){
				if(shots[i].y > this.y - this.r && shots[i].y < this.y + this.r){
					this.r += 0.5;
				}
			}
		}
		if(this.r > 2*r){
			this.r = 0;
		}
		this.draw();
	}
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.fillStyle = 'rgba(255, 0, 0, 0.3)';
		c.fill();
		c.stroke();
		c.closePath();
	}
}

function Ship(){
	this.w = 100;
	this.h = 50;
	this.x = canvas.width/2 - this.w/2;
	this.y = canvas.height - this.h - 5;
	this.speed = 10;

	this.moveLeft = function(){
		if(this.x > 10)
			this.x -= this.speed;
	}

	this.moveRight = function(){
		if(this.x + this.w + 10 < canvas.width)
			this.x += this.speed;
	}

	this.update = function(){
		this.draw();
	}
	this.draw = function(){
		c.beginPath();
		c.rect(this.x, this.y, this.w, this.h);
		c.fillStyle = 'rgba(50, 180, 255, 0.6)';
		c.fill();
		c.stroke();
		c.closePath();
	}
}

function Shot(){
	this.x = hero.x + hero.w/2;
	this.y = hero.y;
	this.r = 5;
	this.speed = 10;
	
	this.update = function(){
		this.y -= this.speed;
		this.draw();
	}

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.fillStyle = 'rgba(20, 255, 100)';
		c.fill();
		c.stroke();
		c.closePath();
	}

}

//Enemy Array;
var enemies =  [];
var row_count = 10;
var spacing = 200;
var space = 50; 
var radius = (canvas.width - (spacing + space*(row_count-1)))/(2*row_count);
function addEnemies(){
	for (var i = 0; i < row_count; i++) {
		if(i > 0){
			console.log("fin");
			enemies.push(new Enemy(enemies[enemies.length - 1].x + radius*2 + space, radius + 10, radius ));
		}
		else{
			console.log("1up");
			enemies.push(new Enemy(radius + spacing/2, radius + 10, radius));
		}
	}
}
//Ship object
var hero = new Ship();

//shots array
var shots = []

function fire(){
	shots.push(new Shot());
}

//animate
var score = 0;
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < enemies.length; i++){
		enemies[i].update();
	}

	var first = 0;
	if(enemies[first].x - enemies[first].r - 10 < 0){
		move = 1;
	}
	if(enemies[row_count - 1].x + enemies[row_count-1].r + 10 > canvas.width){
		move = -1;
	}
	if(lowest > canvas.height - 100){
		alert("GAME OVER!! YOUR SCORE: " + score);
	}
	console.log(move);
	hero.update();
	for(var i = 0; i < shots.length; i++){
		shots[i].update();
	}
	score++;
}

//EventListeners

document.addEventListener('keydown', function(event){
		var key = event.key;
		console.log(event);
		if(key == 'a' || key == 'ArrowLeft')
			hero.moveLeft();
		
		if(key == 'd' || key == 'ArrowRight')
			hero.moveRight();

		if(key == ' ' || key == 'ArrowUp')
			fire();

})


addEnemies();
console.log(enemies);
setInterval(function(){
	for(var i = 0; i < enemies.length; i++){
		if(enemies[i].r == 0){
			enemies[i].state = 0;

		}

		enemies[i].y += radius*2 + 10;
		if (enemies[i].state == 1){
			if(enemies[i].y > lowest){
				lowest = enemies[i].y;
			} 
		}
	}
	console.log(enemies);
	addEnemies();
}, 10000);

animate();