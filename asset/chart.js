$(document).ready(function () {
  var X = 180;
  var Y = 180;
  var outterRadius = 150;
  var innerRadius = 110;

  // 1. get a reference to myCanvas element.
  var c = document.getElementById("myChart");

  // 2. get canvas context
  var context = c.getContext("2d");

  // 3. draw donut chart

  // RED
  setRadialGradient("#DC1C29", "#B7161B");
  drawDonut(Math.PI * 0.32, Math.PI * 0.5);

  // GREEN
  setRadialGradient("#84BC3D", "#5B8829");
  drawDonut(Math.PI*0.5 , Math.PI* 1.5);

  // BLUE
  setRadialGradient("#27A1D4", "#2182AD");
  drawDonut(Math.PI * 1.5, Math.PI*2);

  // YELLOW
  setRadialGradient("#ECCF2D", "#F1C433");
  drawDonut(0, Math.PI*.32);

  //*******************************************************//\        
  // drawDonut() function drawes 2 full or partial circles inside each other one clockwise and the other is counter-clockwise
  function drawDonut(sRadian, eRadian){
      
     context.beginPath();
         context.arc(X, Y, outterRadius, sRadian, eRadian, false); // Outer: CCW
         context.arc(X, Y, innerRadius, eRadian, sRadian, true); // Inner: CW
     context.closePath();
      
     // add shadow
     addShadow();
                      
     context.fill();
  }

  function addShadow(){
     context.shadowColor = "#333";
     context.shadowBlur = 5;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
  }

  function setRadialGradient(sgc, bgc){
     var grd = context.createRadialGradient(X, Y, innerRadius + 5, X, Y, outterRadius);
     grd.addColorStop(0,sgc);
     grd.addColorStop(1,bgc);
     context.fillStyle = grd;
  }
});