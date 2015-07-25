window.onload = function () {
	var CONST = {
		START_MINUTE : 1,
	}

	var timer = document.querySelector("#timer");
	initializeTimer(timer);

	var button = document.querySelector("#button");
	button.addEventListener("click", countdown); 
	window.addEventListener("keydown", countdown);

	function countdown (ev) {
		//spacebar가 아니면 return
		if(ev.type === "keydown" && ev.keyCode !== 32) {
			return;
		}
		var start = new Date();
		var elapsedSeconds = 60;
		var interval = setInterval(tick, 1000);

		var work = prompt("작업한 것: ");
		console.log(work);
		function tick(timestamp) {
			if(elapsedSeconds === CONST.START_MINUTE * 60 + 59) {
				initializeTimer(timer);
				clearInterval(interval);

				return;
			}
			elapsedSeconds++;
			console.log(elapsedSeconds);
			var elapsedMinutes = Math.floor(elapsedSeconds/60);
		 	var modularElapsedSeconds = elapsedSeconds % 60;
			var mm =  CONST.START_MINUTE - elapsedMinutes;
			var ss = 60 - modularElapsedSeconds;
			mm = (String(mm).length == 1) ? "0" + mm : mm;
			ss = (String(ss).length == 1) ? "0" + ss : ss;	
			timer.innerText = mm + ":" + ss;
		}
	}

	function initializeTimer(timer) {
		var startMinute = (String(CONST.START_MINUTE).length == 1) ? "0" + CONST.START_MINUTE : CONST.START_MINUTE;
		timer.innerText = startMinute + ":" + "00";
	}
 }