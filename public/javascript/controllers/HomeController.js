(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);



	function HomeController(HomeFactory) {
		var vm = this;
		vm.head = 'Daily Task Manager';
		vm.newToDo = {};

	// 'data' is from the factory response
	HomeFactory.getTodos().then(function(data){
		console.log(data);
		vm.todos = data;
	});
	vm.addToDo = function(){
		// value passed in create is same in function to create
		HomeFactory.createToDo(vm.newToDo).then(function(res){
			vm.newToDo = res;
			vm.todos.push(vm.newToDo);
			vm.newToDo = {};
		});
	};

	vm.deleteToDo = function(newToDo){
		vm.todos = [];
		HomeFactory.removeToDo(newToDo.id).then(function(res){
			vm.todos.splice(vm.todos.indexOf(newToDo), 1);
		});
	};
	vm.completeToDo = function(todo){
		HomeFactory.completeToDo(todo).then(function(){
			todo.completed = new Date();
		});
	};
	vm.unCompleteToDo = function(todo){
		HomeFactory.unCompleteToDo(todo).then(function(){
			todo.completed = null;
		});
	};
	}
})();


/*

coderbyte 10-14
var str = "coder(cam(p))"
var res = str.replace(/[^()]/g, '');

var count = 0;
var prev = [];
for (var i = 0; i < res.length; i++) {
	if(res[i] ==='('){
	count++;
		}else{
		if(	count === 0) return 0;
		count -= 1;
	}
	}
if(count === 0) console.log(1);
else console.log(0);


*/
