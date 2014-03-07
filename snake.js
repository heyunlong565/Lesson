<html xmlns=http://www.w3.org/1999/xhtml>
<head>
	<meta http-equiv=Content-Type content="text/html;charset=utf-8">
	<title>俄罗斯方块 </title>
	<style type="text/css">
		.bg{
			width: 544px;
			height: 576px;
			border: 1px solid black;
			margin: 0 auto;
			overflow: hidden;
		}
		.fg{
			width: 30px;
			height: 30px;
			border: 1px solid black;
			background-color: white;
			float: left;
		}
		.snake{
			background-color: black;
		}
		.snakeb{
			background-color: black;
		}
	</style>
</head>
<body>
	<div class="bg">

	</div>
</body>
<script type="text/javascript" src="./jQuery.js"></script>
<script type="text/javascript">
	(function($){
		var bgdiv = $("div.bg");
		var a = [], snake = [];
		var FLAG = false, Seeds;
		//var snake = [1,2,3,4,5,6];

		function createDiv(id){
			var fgdiv = document.createElement("div");
			var id = 'id'+id;
			$(fgdiv).addClass("fg").attr({"id":id});
			$(bgdiv).append($(fgdiv));
			return fgdiv;	
		}
		for(var i=0; i<1000; i++){
			createDiv(i);
		}
		function init(){
			for(var i=0; i<18; i++){
				a[i] = new Array();
				for(var j = 0; j<17; j++){
					a[i][j]=0;
				}
			}			
		}
		var timer;
		function gameOver(){
			console.log('game over!');
			clearInterval(timer);
		}

		function Seed(){
			this.x = parseInt(Math.random()*17);
			this.y = parseInt(Math.random()*18);
			var index = (this.y*17) + this.x;
			this.id = 'id'+index;
			//console.log(this.id);
			var that = this;
			this.show = function(){
				$("#" + that.id).addClass("snake");
			};
			this.remove = function(){
				$("#" + that.id).removeClass("snake");
			}
			this.position = function (){
				a[this.y][this.x] = 1;
			}
			this.eat = function(type){
				var x = this.x, y=this.y;
				switch(type){
					case 'U':
						y--;
						break;
					case 'D':
						y++;
						break;
					case 'L':
						x--;
						break;
					case 'R':
						x++;
						break;
				}
				if(a[y][x] == 1){
					console.log('吃到了...');
					FLAG = false;
					snake.unshift(Seeds);
				
				}
			}
			this.move = function(){
				this.remove();
				var index = (this.y*17) + this.x;
			    this.id = 'id'+index;
				this.show();
				//snake.				
			}
			this.trace = function(){
			
			}
			this.up = function(){
				that.y --;
				if(that.y < 0){
					gameOver();
					return false;
				}
				this.move();
				this.eat('U');
			}
			this.down = function(){
				that.y ++;
				if(that.y > 17){
					gameOver();
					return false;
				}
				this.move();
				this.eat('D');
			}
			this.left = function(){
				that.x --;
				if(that.x < 0){
					gameOver();
					return false;
				}
				this.move();
				this.eat('L');
			}
			this.right = function(){
				that.x ++;
				if(that.x > 16){
					gameOver();
					return false;
				}
				this.move();
				this.eat('R');
			}
			this.start = function(){
				switch(Face){
					case 'L':
						this.left();
						break;
					case 'U':
						this.up();
						break;
					case 'D':
						this.down();
						break;
					case 'R':
						this.right();
						break;
				}
			}
			this.run = function(){
				this.start();
				if(!FLAG){
					Seeds = new Seed();
					Seeds.show();
					Seeds.position();
					//console.log(seed2);
					FLAG = true;
				}

				//swap(snake, this);
				// for(var i = 0;i<snake.length;i++){
				// 	console.log(snake[i].id);
				// }
				 console.log(snake);
			}
		}
		function swap(A, b){
		var B = A[0];
		A[0] = b

		for(var i = 1;i< A.length; i++){
		   var C = A[i];
		   A[i] = B;
		   B = C;
		}
		return A;
		}
		var Face = 'L';
		function initEvent(){
			$(document).bind('keydown', function(e){
				switch(e.keyCode){
					case 37:
						Face = 'L';
						break;
					case 38:
						Face = 'U';
						break;					
					case 39:
						Face = 'R';
						break;
					case 40:
						Face = 'D';
						break;
				}
				//console.log(e.keyCode);
			});
		}
		init();
		initEvent();
		var snakeHead = new Seed();
		//console.log(seed);
		

		if(snake.length == 0){
			snake.unshift(snakeHead);
		}
		function initSnake(snake, b){
			var n = [];
			for(var i in snake){
				n[i] = snake[i].id;
			}
			n = swap(n, b.id);
			for(var i in n){
				$("#"+n[i]).addClass('snakeb');
				console.log($("#"+n[i]));
			}
		for(var i=0; i<a.length; i++){
			for(var j=0; j<a[0].length; j++){
				var index = (i*17)+j;
				var id = "id"+index;
				for(var k=0; k<n.length;k++){
					//console.log(id);
					if(n[k] == id){
						$("#"+id).removeClass('snakeb');
					}
				} 
			}
		}	
			console.log(n);
		}

		timer = setInterval(function(){
			var b = snake[0];
			snake[0].run();
			initSnake(snake, b);
		}, 500);
		//seed.up();
		//console.log(a);
	})(jQuery)
</script>
</html>	
