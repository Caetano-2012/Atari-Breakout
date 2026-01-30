let ball;
let paddle;

function setup() {
    createCanvas(600, 600);

    ball = {
        x: width / 2,
        y: height / 2,
        r: 10,
        vx: 3,
        vy: 3
    };

    paddle = {
        x: width / 2,
        y: height - 20,
        w: 100,
        h: 10
    };
}

function draw() {
    background(0);

    ellipseMode(RADIUS);
    fill("white");
    ellipse(ball.x, ball.y, ball.r);

    rectMode(CENTER);
    fill("yellow");
    rect(paddle.x, paddle.y, paddle.w, paddle.h);

    ball.x += ball.vx;
    ball.y += ball.vy;

    if(ball.x - ball.r < 0 || ball.x + ball.r > width) ball.vx *= -1;
    if(ball.y - ball.r < 0) ball.vy *= -1;

    paddle.x = constrain(mouseX, paddle.w / 2, width - paddle.w / 2);

    if(
        ball.y + ball.r > paddle.y - paddle.h / 2 &&
        ball.y + ball.r < paddle.y + paddle.h / 2 &&
        ball.x > paddle.x - paddle.w / 2 &&
        ball.x < paddle.x + paddle.w
    ) {
        ball.vy *= -1;
        let diff = ball.x - paddle.x;
        ball.vx = diff * 0.1;
    }
}