const speedDash = document.querySelector('.speedDash');
            const scoreDash = document.querySelector('.scoreDash');
            const lifeDash = document.querySelector('.lifeDash');
            const container = document.getElementById('container');
            const btnStart = document.querySelector('.btnStart');
            var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/);
            btnStart.addEventListener('click',startGame);
            document.addEventListener('keydown',pressKeyOn);
            document.addEventListener('keyup',pressKeyOff);

            
            
            //Game Variables
            let animationGame; //= requestAnimationFrame(playGame);
            let gamePlay = false;
            let player; 
          

            let keys = {
                ArrowUp:false,
                ArrowDown:false,
                ArrowLeft: false,
                ArrowRight: false
            }
            

           
            function play1() {
        // 기다렸다가 시작 (밀리초)
        setTimeout(function(){
            document.getElementById("audio1").play();
            console.log('your audio is started just now');
          }, 10)


        }


            function setupBadGuys(num){
                for(let x =0; x<num; x++)
                {
                    let temp = 'badGuy'+(x+1);
                    let div = document.createElement('div');
                    div.innerHTML = (x+1);
                    div.setAttribute('class','baddy');
                    div.setAttribute('id',temp);
                    //div.style.backgroundColor = randomColor();
                    makeBad(div);
                    container.appendChild(div);
                }
            }
            
            function randomColor(){
                function c(){
                    let hex = Math.floor(Math.random()*256).toString(16);
                    return ('0'+String(hex)).substr(-2);
                }
                return '#'+c()+c()+c();
            }
            
            
            function makeBad(e){
                let tempRoad = document.querySelector('.road');
                e.style.left = tempRoad.offsetLeft + Math.ceil(Math.random()*tempRoad.offsetWidth)-30+'px';
                e.style.top = Math.ceil(Math.random()*-400)+'px';
                e.speed = Math.ceil(Math.random()*17)+2;
                e.style.backgroundColor = randomColor();
            }
            
            function startBoard(){
                for(let x=0; x<13; x++)
                {
                    let div = document.createElement('div');
                    div.setAttribute('class','road');
                    div.style.top = (x*50)+'px';
                    div.style.width = player.roadwidth + 'px';
                    container.appendChild(div);
                }
            }
            
            function startGame() {
                //console.log(gamePlay);
                container.innerHTML ='';
                btnStart.style.display = "none";
                var div = document.createElement('div');
                div.setAttribute('class','playerBike');
                if(isMobile!=null)//모바일
                {div.x = 300;
                    div.y = 300;}// 자전거 위치
                else{div.x=650;
                    div.y = 500;}//웹

                
                container.appendChild(div);
                gamePlay = true;
                animationGame = requestAnimationFrame(playGame);
                player ={
                    ele:div, 
                    speed:10, //스피드
                    lives:10, //생명
                    gameScore:0,
                    carstoPass:0, //차 지나가기
                    score :0,
                    roadwidth:250,
                    gameEndCounter:0
                }
            
                startBoard();
                setupBadGuys(10);
            }
            
            function init(){
                //Find out Div Element
                var dataContainerOrientation = document.getElementById('dataContainerOrientation');
                var dataContainerMotion = document.getElementById('dataContainerMotion');
                var ball = document.getElementById("playerBIke");
                var garden = document.getElementById("garden");
                var a;
                var b;
                
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
                        
                        
                        playerBike.style.left = (maxX*beta/180 + 100) + "px";
                        playerBike.style.top  = (maxY*gamma/180 + 100) + "px";
                      
                      
                      

                        
                    }, false);
                }
    
                //가속도에 변화가 발생 할때 
                if(window.DeviceMotionEvent){
                    window.addEventListener('devicemotion', function(event){
                        x = event.accelerationIncludingGravity.x;
                        y = event.accelerationIncludingGravity.y;
                        z = event.accelerationIncludingGravity.z;
                    }, true);
                }
    
                }







               function pressKeyOn(event){
                event.preventDefault();
                //console.log(keys);
                keys[event.key]=true;
            }
           function pressKeyOff(event){
                event.preventDefault();
                //console.log(keys);
               keys[event.key]=false;
            }
            
            
            function updateDash(){
                //console.log(player);
                scoreDash.innerHTML = player.score;
                lifeDash.innerHTML = player.lives;
                speedDash.innerHTML = Math.round(player.speed*10);
            }
            
            function moveRoad(){
                let tempRoad = document.querySelectorAll('.road');
                //console.log(tempRoad);
                let previousRoad = tempRoad[0].offsetLeft;
                let previousWidth = tempRoad[0].offsetWidth;
                const pSpeed = Math.floor(player.speed);
                for(let x=0; x<tempRoad.length; x++)
                {
                    let num = tempRoad[x].offsetTop + pSpeed;
                    if(num>600){
                        num = num - 650;
                        let mover = previousRoad + (Math.floor(Math.random()*6)-3);
                        let roadWidth = (Math.floor(Math.random()*11)-5)+previousWidth;
                        if(roadWidth<200)roadWidth=200;
                        if(roadWidth>400)roadWidth=400;
                        if(mover<100)mover=100;
                        if(mover>600)mover=600;
                        //도로 시작
                        if(isMobile!=null)//모바일
                        {tempRoad[x].style.left = "40%";}// 도로 위치
                        else{tempRoad[x].style.left = "40%";}//웹
                        tempRoad[x].style.width = roadWidth + 'px';
                        previousRoad = tempRoad[x].offsetLeft;
                         previousWidth = tempRoad[x].width;
                    }
                    tempRoad[x].style.top = num + 'px';
                }
                return {'width':previousWidth,'left':previousRoad};
            }
            
            function isCollide(a,b){
                let aRect =a.getBoundingClientRect();
                let bRect =b.getBoundingClientRect();
                //console.log(aRect);
                return !(
                    (aRect.bottom < bRect.top)||
                    (aRect.top > bRect.bottom)||
                    (aRect.right <bRect.left)||
                    (aRect.left > bRect.right)
                )
            } 
            
            function moveBadGuys(){
                let tempBaddy = document.querySelectorAll('.baddy');
                for(let i=0; i<tempBaddy.length; i++)
                {   
                    for(let ii=0; ii<tempBaddy.length; ii++)
                    {
                        if(i!=ii && isCollide(tempBaddy[i],tempBaddy[ii]))
                        {
                            tempBaddy[ii].style.top = (tempBaddy[ii].offsetTop + 50)+'px';
                            tempBaddy[i].style.top = (tempBaddy[i].offsetTop - 50)+'px';
                            tempBaddy[ii].style.left = (tempBaddy[ii].offsetLeft - 50)+'px';
                            tempBaddy[i].style.left = (tempBaddy[i].offsetLeft + 50)+'px';
                        }
                    }
            
                    let y = tempBaddy[i].offsetTop + player.speed - tempBaddy[i].speed;
                    if(y>2000 || y<-2000){
                        //reset car
                        if(y>2000)
                        {
                            player.score++;
                            if(player.score > player.carstoPass)
                            {
                                gameOverPlay();
                            }
                        }
                        makeBad(tempBaddy[i]);
                    }else{
                        tempBaddy[i].style.top = y + 'px';
                        let hitCar = isCollide(tempBaddy[i],player.ele);
                        console.log(hitCar);
                        if(hitCar){
                            player.speed =0;
                            player.lives--;
                            if(player.lives<1)
                            {
                                //gameover
                            player.gameEndCounter = 1;
                            }
                            makeBad(tempBaddy[i]);
                        }
                    }
                }
            } 
            
            function gameOverPlay()
            {
                
                player.gameEndCounter =12;
                player.speed =0;
            }
            
            function playGame(){
           


              




                if(gamePlay){
                updateDash();
                //movement
                let roadPara=moveRoad();
                moveBadGuys();
                if(isMobile!=false){
                
                    init();
        
       }
                
                if(alpha>5)
                {   if(player.ele.y>400)
                {player.ele.y -=  1;}
                    player.speed = player.speed <20 ? (player.speed+0.05):20;
                }
                if(alpha<-5)
                {   if(player.ele.y<500)
                    {player.ele.y +=  1;}
                    player.speed = player.speed>0?(player.speed-0.2):0;
                }
               if(beta>5)
                {
                    player.ele.x += (player.speed/4);
                }
                if(beta<-5)
                {
                    player.ele.x -= (player.speed/4);
                } 
            //CHECK IF ON ROAD
                
            if((player.ele.x + 40)<roadPara.left || (player.ele.x)>(roadPara.left + roadPara.width))
                {   if(player.ele.y <500)player.ele.y += +1;
                    player.speed = player.speed >0?(player.speed-0.2):5;
                    //console.log('OFF ROAD'); /* //도로에 있나 없나
                }
            
                //move car
              
                }
                animationGame = requestAnimationFrame(playGame);
                if(player.gameEndCounter>0)
                {
                    player.gameEndCounter--;
                    player.y = (player.y >60)?player.y-30:60;
                    if(player.gameEndCounter ==0)
                    {
                        gamePlay = false;
                        if(player.lives<1)
                        {
                        let losediv = document.createElement('div');
                        losediv.setAttribute('class','road');
                        losediv.style.top = '500px';
                        losediv.style.backgroundColor ='red';
                        losediv.style.width = '250px';
                        losediv.innerHTML = 'You Lose!';
                        losediv.style.fontSize = '3em';
                        losediv.style.zIndex = '120';
                        container.appendChild(losediv);
                        }
                        cancelAnimationFrame(animationGame);
                        btnStart.style.display = 'block';
                    }
                }
            }
