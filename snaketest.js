var rst = [];
function seed(){
return parseInt(Math.random()*100);
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
function q(){
	if(rst.length>10){
	return false;
	}
	rst.push(seed());
	return true;
}
function loop(){
if(!q()){
swap(rst, rst[0]-1);
}
console.log(rst);
}
