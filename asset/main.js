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
	}
}

$(document).ready(function () {
	$("#work-inventory-bar").on("click", Modal.display);
});

