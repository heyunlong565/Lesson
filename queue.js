(function (){
	var length = 6;

	function seeds(){
		var x = parseInt(Math.random()*100);
		var y = parseInt(Math.random()*100);
		return [x,y].join('__');
	} 

	function queue(){
		var q = [];
		
		this.addhead = function(o){
			q.unshift(o);
		}
		this.rmtail = function(){
			q.pop();
		}
		this.update = function(o){
			this.addhead(o);
			this.rmtail();
		}
		this.getq = function(){
			return q;
		}
	}

    var R = new queue();

	function initLoop(){
		if(R.getq().length < length){
			R.addhead(seeds());
		}else{
			R.update(seeds());
		}
		console.log(R.getq())
	}

	setInterval(initLoop, 1000);

})();
