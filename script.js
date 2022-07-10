// version 0.0.1

window.onload = function(){
    
    // pegar o espaço que sera renderizado na tela
    canvas = document.getElementById('canvas');
    
    // configurar o aspecto 2d
    ctx = canvas.getContext("2d");

    // Variáveis
    snake = [];
    positionX = 10;
    positionY = 10;
    foodX = 15;
    foodY = 15;
    velX = 0;
    velY = 0;
    grid = 20;
    tam = 3;
    ponto = 0;
    recorde = 0;
    
    // chama a função jogo
    setInterval(jogo, 100);

    // controles
    document.addEventListener('keydown', function(e){
        switch(e.keyCode){

            // direita = 39
            case 39:
                velX = 1;
                velY = 0;
                break;

            // esquerda = 37
            case 37:
                velX = -1;
                velY = 0;
                break;
            
            // cima = 38
            case 38:
                velX = 0;
                velY = -1;
                break;

            // baixo = 40
            case 40:
                velX = 0;
                velY = 1;
                break;
        }
    })
}

// mecânica do jogo
function jogo(){

    // conf da tela
    ctx.fillStyle = "#2980b9";

    // seta distancia da borda X,Y, largura,altura
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Deslocamento da snake
    positionX += velX;
    positionY += velY;

    // Espelhamento (limitando o espaço)
    if(positionX < 0){
        console.log('<0 :'+ positionX);
        positionX = grid;
    }
    if(positionX > grid){
        positionX = 0;
        console.log('>grid :'+ positionX);
    }
    if(positionY < 0){
        positionY = grid;
    }
    if(positionY > grid){
        positionY = 0;
    }

    // conf da snack
    ctx.fillStyle = "#00f102";
    for(let i = 0; i <snake.length; i++){
        ctx.fillRect(snake[i].x*grid, snake[i].y*grid, grid-1, grid-1);
        if(snake[i].x == positionX && snake[i].y == positionY){
            tam = 3;
            ponto = 0;
        }
    }

    // Posição da snake
    snake.push({x: positionX, y: positionY})


    // apagando rastro
    while(snake.length > tam){
        snake.shift();
    }

    // Conf a comida
    ctx.fillStyle = "#f1c40f";
    ctx.fillRect(foodX*grid, foodY*grid,grid-1,grid-1);

    // Colisão da snake com a comida
    if(positionX == foodX && positionY == foodY){
        tam++;
        foodX = Math.floor(Math.random()*grid);
        foodY = Math.floor(Math.random()*grid);
        ponto += 10;
    }

    if(ponto > recorde ){
        recorde = ponto;
    }

    // imprimir na tela ponto
    selectPonto = document.querySelector('span.ponto');
    selectPonto.innerHTML = ponto;
    selectRecorde = document.querySelector('span.recorde');
    selectRecorde.innerHTML = recorde;
}