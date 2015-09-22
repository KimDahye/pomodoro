/*custom event define*/
timerEnd = new CustomEvent("timerEnd");

/*Modal*/
var Modal = {
	display: function (e) {
		var arrowhead = document.querySelector("header .arrow-head");
		var modal = document.querySelector("header .modal");
		if(modal.style.display === "block") {
			arrowhead.style.display = "none";
			modal.style.display = "none";
		} else {
			arrowhead.style.display = "block";
			modal.style.display = "block";		}
	},
}

/*Pomodoro*/
function Pomodoro(startTime, focusingWork) {
	this.startTime = startTime;
	this.endTime;
	this.detailNotes;
	this.todo = focusingWork;
}

Pomodoro.prototype.setEndTime= function(endTime) {
	this.endTime = endTime;
}

Pomodoro.prototype.setDetailNotes = function(detailNotes) {
	this.detailNotes = detailNotes;
}

Pomodoro.prototype.setTodo = function(todo){
	this.todo = todo;
}

Pomodoro.prototype.save = function() {
	// [DB]에 pomodoro 저장;
}

/*Todo*/
var Todo = {
	
}
 
/*Today*/
var Today = {
	date: new Date(),
	sound : new Audio("dingdong/dingdong.mp3"),
	todoList : [],
	timer : null,
	timerEndHandler : null,

	// parse: function() {
	// 	this.todoList = $(".todo-today textarea").val().split("\n");
	// 	//[DB]에 Today.date - todoList 순서쌍 저장! - 각각의 id를 반환받는다. 
	// },

	isStartable: function () {
		//todo가 하나라도 있으면 true;
		console.log($('.todo-today .todo-list').children().length);
		return $('.todo-today .todo-list').children().length !== 0;
	},

	setTimer: function(timer) {
		this.timer = timer;
	},

	selectWork: function() {
		$('#todo-list-modal').css('display', 'block');
		$('#todo-list-modal .todo-list').on('click', 'input', function(e) {
			var input = e.currentTarget;
			var tid = input.parentNode.dataset.tid;
			var todoContent = input.value();
		})
	}, 

	startPomodoro: function() {
		//this.parse();
		// if(this.todoList.length === 0 || this.todoList[0] === "") {
		// 	alert("todo today를 입력하세요.");
		// 	return;
		// }

		if(!this.isStartable()){
			alert("todo today를 입력하세요.");
			return;
		}
		console.log(this.isStartable());

		//todo 선택하는 modal창 띄우고, 선택 입력받기
		$(".center .finish").show();
		$(".center .start").hide();
		this.work();
	},

	finishPomodoro: function() {
		$(".center .finish").hide();
		$(".center .start").show();
		
		//$(".todo-today textarea").val(""); 
		//todo 목록 reset
		this.timer.clearInterval();
		this.timer.initializeTimer(this.timer.pomodoroTime);
	},

	work: function() {
		var focusingWork = this.selectWork();
		var pomodoro = new Pomodoro(new Date(), focusingWork);
		this.timer.countdown(this.timer.pomodoroTime, this.timer.breakTime);
		$(window).off("timerEnd", this.timerEndHandler);
		this.timerEndHandler = this.break.bind(this, pomodoro)
		$(window).on("timerEnd", this.timerEndHandler); 
	},

	break: function(pomodoro) {
		this.sound.onplay = function () { 
			var detailNotes = prompt("You can note a detail about this work or skip it.");
			pomodoro.setEndTime(new Date());
			pomodoro.setDetailNotes(detailNotes);
			pomodoro.save();
		};
		this.sound.play();
		var completed = confirm(pomodoro.todo+"(을)를  완료하셨나요?");
		if(completed) {
			//[DB] update todo as completed = true;
		}

		this.timer.countdown(this.timer.breakTime, this.timer.pomodoroTime);
		

		$(window).off("timerEnd", this.timerEndHandler);
		this.timerEndHandler = this.work.bind(this);
		$(window).on("timerEnd", this.timerEndHandler);
	}
}

/*ajax callback functions*/
var ajaxCallback = {
	workAdd: function (data) {
		console.log(data); 
		//todo - data 받아서 template에 넣고 ul에 붙여주기
	},

	workDelete: function (data) {
		console.log(data);
		//todo - data 받아서 성공여부 확인한뒤 list 지워주기
	},

	todoAdd: function (data) {
		console.log(data); 
		//todo - data 받아서 template에 넣고 ul에 붙여주기
	},

	todoComplete: function (data) {
		console.log(data);
		//todo - data 받아서 성공여부 확인한뒤 list 지워주기		
	}
}

/*Main*/
$(document).ready(function () {
	var timer = new Timer(2, 1);
	timer.initializeTimer(2);
	Today.setTimer(timer);

	$("#work-inventory-bar").on("click", Modal.display);
	$(".center .start").on("click", Today.startPomodoro.bind(Today)); //여기서 bind(this)를 하면 #documnet가 나온다.. 이렇게 Today를 직접 binding할 수 밖에 없는 건가?
	$(".center .finish").on("click", Today.finishPomodoro.bind(Today)); 

	//work add ajax
	$('.work-add-btn').on('click', function(){ 
		console.log('content='+$('.work-input').val());
	  	$.ajax({ 
    		url: '/work', 
    		method: 'POST',
    		data: {'content' : $('.work-input').val()}
   		}).done(ajaxCallback.workAdd);
	});

	//work delete ajax
	$('.work-list').on('click', '.work-delete-btn', function(e) {
		var wid = e.currentTarget.parentNode.dataset.wid;
	  	$.ajax({ 
    		url: '/work/' + wid, 
    		method: 'DELETE',
   		}).done(ajaxCallback.workDelete);
	});

	//add todo
	$('.todo-add-btn').on('click', function(){ 
		console.log('content='+$('.todo-input').val());
	  	$.ajax({ 
    		url: '/todo', 
    		method: 'POST',
    		data: {'content' : $('.todo-input').val()}
   		}).done(ajaxCallback.workAdd);
	}); 

	//complete todo
	$('.todo-list').on('click', 'input', function(e) {
		var input = e.currentTarget;
		var tid = e.currentTarget.parentNode.dataset.tid;
		var completed = input.checked? 1 : 0;
	  	$.ajax({ 
    		url: '/todo/' + tid, 
    		method: 'PUT',
    		data: 'completed=' + completed
   		}).done(ajaxCallback.todoComplete);
	});
});