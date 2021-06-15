<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!--
	<title>스마트폰 자이로 센서를 이용한 디바이스 컨트롤 </title>
	-->
	<style type="text/css">
		h1 {
			text-align: center;
		}
		.data {
			width: 90%; 
			margin: 10px auto; 
			background: red; 
			padding: 8px;
			border-radius: 8px;
			opacity: 0;
		}

		
		
		#dataContainerMotion {
			font-size: 1.5em;
			opacity: 0;
		}

		#garden{
			position: relative;
			width: 300px;
			height: 300px;
			margin: 0 auto;
			border: 1px solid #ccc;
		}


		.ball {
			position: absolute;
			top: 100px;
			left: 100px;
			width: 100px;
			height: 100px;
			border-radius: 0%;
			background-image: url(car1.png);
    		background-size: cover;
			text-align: center;
			line-height: 100px;
			color: white;
		}
		
		
		

	</style>
</head>
<body onload="init()">
	<audio id="audio1">
		<source src="adrian.mp3" type="audio/mp3">
	  Your browser does not support the audio element.
	  </audio>


	
<!--
	<h1>스마트폰 자이로 센서의 활용</h1>
-->

	<div id="dataContainerOrientation" class="data"></div>
	<div id="dataContainerMotion" class="data"></div>

	<!-- ball -->
	<div id="garden">
		<div id="ball" class="ball"></div>
	</div>


	<script type="text/javascript">


		function init(){
			//Find out Div Element
			var dataContainerOrientation = document.getElementById('dataContainerOrientation');
			var dataContainerMotion = document.getElementById('dataContainerMotion');
			var ball = document.getElementById("ball");
			var garden = document.getElementById("garden");
			var supportsVibrate = "vibrate" in navigator;
			var maxX = garden.clientWidth * 2 - ball.clientWidth;
			var maxY = garden.clientHeight * 2- ball.clientHeight;
			//alert(maxY);


			//가속도계가 기기의 방향의 변화를 감지 했을때
			if(window.DeviceOrientationEvent){
				//이벤트 리스너 등록
				window.addEventListener('deviceorientation', function(event) {
					var absolute = event.absolute;
					var alpha = event.alpha;
					var beta = event.beta; //(-180, 180)
					var gamma = event.gamma; //(-90, 90)
					console.log(gamma);
					var html =  "absolute: " +absolute+ "<br>alpha: " +alpha+ "<br>bata: " +beta+ "<br>gamma: "+ gamma; 
					dataContainerOrientation.innerHTML = html;	


					//볼을 움직이자.
					if(beta > 90) {beta = 90};
					if(beta < -90) {beta = -90};
					beta +90;
					gamma +90;

					ball.style.top = (maxX*beta/180 + 100) + "px";
					ball.style.left = (maxY*gamma/180 + 100) + "px";
					
				}, false);
			}

			//가속도에 변화가 발생 할때 
			if(window.DeviceMotionEvent){
				window.addEventListener('devicemotion', function(event){
					var x = event.accelerationIncludingGravity.x;
					var y = event.accelerationIncludingGravity.y;
					var z = event.accelerationIncludingGravity.z;
					//var r = event.accelerationIncludingGravity.r;
                  
				


					var html = "x: " +x+ "<br>y: "+y+ "<br>z: " +z;
					dataContainerMotion.innerHTML = html;

					if(y > 5){
						
						var a = 400;
				play1();
				startVibrate(a);


			}

				}, true);
			}

		

		}
		function play1() {
    // 기다렸다가 시작 (밀리초)
    setTimeout(function(){
        document.getElementById("audio1").play();
		window.navigator.vibrate([500,10,500,10]);
        console.log('your audio is started just now');
      }, 10)
}
function startVibrate(a) {
	navigator.vibrate();
		
}
	</script>

</body>
</html>
