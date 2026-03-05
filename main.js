let ball;
let paddle;

let bricks= [];
let rows = 4;
let cols = 8;
let brickWidth = 60;
let brickHeight = 20;
let spacing = 5;

let score = 0;
let lives = 3;

let gameState = "serve";

let maxSpeed = 12;
let brickSpeed = 0.1;

let offSet = 0;

let clickSound;
let hitSound;

function preload() {
    clickSound = loadSound("click.mp3");
    hitSound = loadSound("hit.mp3");
}

function setup() {
    createCanvas(600, 600);

    ball = {
        x: width / 2,
        y: height / 2,
        r: 10,
        vx: 0,
        vy: 0
    };

    paddle = {
        x: width / 2,
        y: height - 20,
        w: 100,
        h: 10
    };

    createBricks()
}

function draw() {
    background(0);

    //Placar
    fill(255);
    textSize(16);
    text("Score: " + score, 20, 20);
    text("Lives: " + lives, 20, 40)

    //Mostrar tijolos e fazê-los descer
    for(let i = 0; i < bricks.length; i++) {
        bricks[i].y += brickSpeed;
        fill(bricks[i].color);
        rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);

        if (bricks[i].y + bricks[i].h >= paddle.y - paddle.h/2) {
            lives = 0;
            gameState = "over";
        }
    }

    //Bola
    ellipseMode(RADIUS);
    fill("white");
    ellipse(ball.x, ball.y, ball.r);

    //Raquete
    rectMode(CENTER);
    fill("yellow");
    rect(paddle.x, paddle.y, paddle.w, paddle.h);

    paddle.x = constrain(mouseX, paddle.w / 2, width - paddle.w / 2);
    /*if(frameCount % 10 === 0) {
        offSet = random(-20, 20);
    }
    let targetX = ball.x + offSet;
    paddle.x = lerp(paddle.x, targetX, 0.1);
    paddle.x = constrain(paddle.x, paddle.w/2, width - paddle.w / 2);*/

    if (gameState === "serve") {
        textSize(18);
        text("Clique para lançar a bola", width/2 - 80, height/2);
        ball.x = width/2;
        ball.y = height - 36;
        ball.vx = 0;
        ball.vy = 0;
    }

    if (gameState === "play") {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if(ball.x - ball.r < 0 || ball.x + ball.r > width) ball.vx *= -1;
        if(ball.y - ball.r < 0) ball.vy *= -1;

        if(
            ball.y + ball.r > paddle.y - paddle.h / 2 &&
            ball.y + ball.r < paddle.y + paddle.h / 2 &&
            ball.x > paddle.x - paddle.w / 2 &&
            ball.x < paddle.x + paddle.w / 2
        ) {
            ball.vy *= -1;
            let diff = ball.x - paddle.x;
            ball.vx = diff * 0.1;
            if(hitSound.isLoaded()) hitSound.play();
        }

        for(let i = bricks.length - 1; i >= 0; i--) {
            let b = bricks[i];
            if (ball.x + ball.r > b.x && ball.x - ball.r < b.x + b.w &&
                ball.y + ball.r > b.y && ball.y - ball.r < b.y + b.h) 
            {
                ball.vy *= -1;
                score += 5;
                bricks.splice(i, 1)
                ball.vx *= 1.05;
                ball.vy *= 1.05;
                ball.vx = constrain(ball.vx, -maxSpeed, maxSpeed);
                ball.vy = constrain(ball.vy, -maxSpeed, maxSpeed);
                if(clickSound.isLoaded()) clickSound.play()
                break;
            }
        }

        if (ball.y - ball.r > height) {
            lives--;
            if (lives > 0) {
                gameState = "serve";
            } else {
                gameState = "over";
            }
        }
    }

    if (gameState === "over") {
        textSize(24);
        text("Game Over!", width/2 - 70, height / 2);
    }

    if(bricks.length === 0 && gameState === "play") {
        textSize(24);
        text("Parabéns! Você venceu!", width/2 - 120, height/2);
        ball.vx = 0;
        ball.vy = 0;
        //gameState = "end";
    }
}

function mousePressed() {
    if(gameState === "serve") {
        ball.vx = random(-4, 4);
        ball.vy = -5;
        gameState = "play";
    }

}

function createBricks() {
    bricks = [];
    let totalWidth = cols * (brickWidth + spacing) - spacing;
    let startX =(width - totalWidth) - 15;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            bricks.push({
                x: startX + c * (brickWidth + spacing),
                y: 80 + r * brickHeight,
                w: brickWidth - spacing,
                h: brickHeight - 5,
                color: [random(100,255), random(100,255), random(100,255)]
            });
        }
    }
}