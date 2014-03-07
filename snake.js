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
		var FLAG = false, Seeds, LENGTH = 0, currentSnake;

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

		function debug(x,y){
			console.log([x,y].join('__'));			
		}
		//Seed 封装了贪吃蛇的所有属性和方法(行为)
		function Seed(){
			var x = parseInt(Math.random()*17);
			var y = parseInt(Math.random()*18);
			var id = ((y*17) + x);

			this.getid = function(){
				return id;
			}
			this.setid = function(){
				id = ((y*17) + x);
			}
			this.show = function(){
				if(!$("#id"+id).hasClass('snake')){
					$("#id"+id).addClass('snake');					
				}
			}
			this.addhead = function(id){
				snake.unshift(id);
				if(!$("#id"+id).hasClass('snake')){
					$("#id"+id).addClass('snake');
				}
			}
			this.rmtail = function(){
				var t = snake.pop();
				if($("#id"+t).hasClass('snake')){
					$("#id"+t).removeClass('snake');
				}
			}
			this.update = function(id){
				this.addhead(id);
				this.rmtail();
			}
			//用一个队列结构来实现贪吃蛇的移动 吃代表把id压入队列 移动就是头部压入 尾部弹出 压入的就设置样式背景色 弹出的去除样式背景色 
			this.move = function(){
				if(snake.length < LENGTH){
					console.log('add....');
					this.addhead(Seeds.getid());	
				}else{
					console.log('update....');
					this.update(this.getid());
				}
			}			

			this.up = function(){
				y --;
				debug(x,y);
				if(y < 0){
					gameOver();
					return false;
				}
				this.move();
			}
			this.down = function(){
				y ++;
				debug(x,y);
				if(y > 17){
					gameOver();
					return false;
				}
				this.move();
			}
			this.left = function(){
				x --;
				debug(x,y);
				if(x < 0){
					gameOver();
					return false;
				}
				this.move();
			}
			this.right = function(){
				x ++;
				debug(x,y);
				if(x > 16){
					gameOver();
					return false;
				}
				this.move();
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
				//每次循环需要更新当前id
				this.setid();
			}

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
			});
		}

		init();
		initEvent();

		var snakeHead = new Seed();
		snake.unshift(snakeHead.getid());
		if(!currentSnake){
			currentSnake = snakeHead;	
		}

		//主逻辑负责监控是否吃到 是否需要生成新的方块
		timer = setInterval(function(){
			currentSnake.start();
			if(!FLAG){
				Seeds = new Seed();
				LENGTH ++;
				Seeds.show();
				FLAG = true;
			}
			if(currentSnake.getid() == Seeds.getid()){
				console.log('吃到了...');
				FLAG = false;
				snake.unshift(Seeds.getid());
				currentSnake = Seeds;						
			}
		}, 1000);

	})(jQuery)
</script>
</html>	
