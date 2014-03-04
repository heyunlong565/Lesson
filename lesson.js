//闭包
function count(){
	var num = 0;
	return function(){
		console.log(num++);
	}
}
var t = count();
t();
