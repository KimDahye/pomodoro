/*DB에서 넘어온  데이터라고 가정*/
var data = [
    {
        startTime: "201509151700",
        endTime: "201509151725",
        detailNotes: "issue 9 start",
        todo : "html5 project"
    },
    {
      startTime: "201509151730",
      endTime: "201509151755",
      detailNotes: "issue 9 completed",
      todo : "html5 project"
    },
    {
        startTime: "201509151800",
        endTime: "201509151825",
        detailNotes: "",
        todo : "DB study"
    }
];

$(document).ready(function () {
   // 1. get a reference to myCanvas element.
  var canvas = document.getElementById("myChart");

  var X = canvas.width/2;
  var Y = canvas.height/2;
  var outterRadius = 150;
  var innerRadius = 100;

  // 2. get canvas context
  var context = canvas.getContext("2d");

  // 3. draw donut chart
  drawDonut(Math.PI * 1.5, Math.PI * 0, "#F7464A");
  drawDonut(Math.PI*0, Math.PI* 0.5, "#46BFBD");
  drawDonut(Math.PI * 0.5, Math.PI*1, "#FDB45C");
  drawDonut(Math.PI * 1, Math.PI*1.5, "#A8B3C5");

  //*******************************************************//\        
  // drawDonut() function drawes 2 full or partial circles inside each other one clockwise and the other is counter-clockwise
  function drawDonut(sRadian, eRadian, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(X, Y, outterRadius, sRadian, eRadian, false); // Outer: CW
    context.arc(X, Y, innerRadius, eRadian, sRadian, true); // Inner: CCW
    context.closePath();
    context.fill();
  }

  function addShadow(){
     context.shadowColor = "#333";
     context.shadowBlur = 5;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
  }
});