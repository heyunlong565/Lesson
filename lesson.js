//闭包
function count(){
	var num = 0;
	return function(){
		console.log(num++);
	}
}
var t = count();
t();

//oop
//构造函数法
function Person(name, age){
	this.name = name;
	this.age = age;
}
Person.prototype.sayHello = function() {
	console.log("My name is "+ this.name + " Age is " + this.age);
};
Person.prototype.sayHi = function() {
	console.log("Hi, What is your name ?");
};
var person1 = new Person("zhangsan", 20);
var person2 = new Person("Lisi", 22);

person1.sayHello();
person2.sayHello();
