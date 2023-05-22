 //snake game
 var canvas;
 var canvasContext;
 var snakeX = 10;
 var snakeY = 10;
 var snakeXSpeed = 10;
 var snakeYSpeed = 0;
 var snakeTrail = [];
 var snakeTail = 5;
 var appleX = 15;
 var appleY = 15;
 var gridSize = 20;
 var tileCount = 20;
 var score = 0;
 var gameSpeed = 100;
 var gamePaused = false;
 var gameStarted = false;
 var gameEnded = false;
 var gameInterval;
 var gameCanvas;
 var gameCanvasContext;

 function startGame() {
     if (!gameStarted) {
         gameStarted = true;
         gameEnded = false;
         gamePaused = false;
         gameInterval = setInterval(game, gameSpeed);
     }
 }

 function pauseGame() {
     if (!gamePaused) {
         gamePaused = true;
         clearInterval(gameInterval);
     }
 }

 function resumeGame() {
     if (gamePaused) {
         gamePaused = false;
         gameInterval = setInterval(game, gameSpeed);
     }
 }
 //game canvas size should be full screen
 function endGame() {
     if (!gameEnded) {
         gameEnded = true;
         gameStarted = false;
         gamePaused = false;
         clearInterval(gameInterval);
         gameCanvasContext.fillStyle = "grey";
         gameCanvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
         gameCanvasContext.fillStyle = "white";
         gameCanvasContext.font = "30px Arial";
         gameCanvasContext.fillText("Game Over", 100, 200);
         gameCanvasContext.fillText("Score: " + score, 100, 250);
     }
 }


 function game() {
     snakeX += snakeXSpeed;
     snakeY += snakeYSpeed;
     if (snakeX < 0) {
         snakeX = tileCount - 1;
     }
     if (snakeX > tileCount - 1) {
         snakeX = 0;
     }
     if (snakeY < 0) {
         snakeY = tileCount - 1;
     }
     if (snakeY > tileCount - 1) {
         snakeY = 0;
     }
     gameCanvasContext.fillStyle = "black";
     gameCanvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
     gameCanvasContext.fillStyle = "white";
     gameCanvasContext.font = "30px Arial";
     gameCanvasContext.fillText("Score: " + score, 10, 30);
     gameCanvasContext.fillStyle = "lime";
     for (var i = 0; i < snakeTrail.length; i++) {
         gameCanvasContext.fillRect(snakeTrail[i].x * gridSize, snakeTrail[i].y * gridSize, gridSize - 2, gridSize - 2);
         if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
             snakeTail = 5;
             score = 0;
         }
     }
     snakeTrail.push({ x: snakeX, y: snakeY });
     while (snakeTrail.length > snakeTail) {
         snakeTrail.shift();
     }
     if (appleX == snakeX && appleY == snakeY) {
         snakeTail++;
         score++;
         appleX = Math.floor(Math.random() * tileCount);
         appleY = Math.floor(Math.random() * tileCount);
     }
     gameCanvasContext.fillStyle = "red";
     gameCanvasContext.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);
 }

 window.onload = function () {
     gameCanvas = document.getElementById("gameCanvas");
     gameCanvasContext = gameCanvas.getContext("2d");
     document.addEventListener("keydown", keyPush);
 }


 function keyPush(event) {
     switch (event.keyCode) {
         case 37:
             snakeXSpeed = -1;
             snakeYSpeed = 0;
             break;
         case 38:
             snakeXSpeed = 0;
             snakeYSpeed = -1;
             break;
         case 39:
             snakeXSpeed = 1;
             snakeYSpeed = 0;
             break;
         case 40:
             snakeXSpeed = 0;
             snakeYSpeed = 1;
             break;
         case 32:
             if (gameStarted) {
                 if (gamePaused) {
                     resumeGame();
                 } else {
                     pauseGame();
                 }
             } else {
                 startGame();
             }
             break;
         case 27:
             endGame();
             break;
     }
 }

