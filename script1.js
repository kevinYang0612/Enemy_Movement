/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;
const numberOfEnemies = 20;
const enemiesArray = [];

let gameFrame = 0;

class Enemy
{
    constructor()
    {
        this.image = new Image();
        this.image.src = "enemies/enemy2.png";
        this.speed = Math.random() * 4 + 1; // range (-2, 2)
        this.spriteWidth = 1596 / 6;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (canvas.width - this.width); // keeping all enemy image within the canvas
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // range (1, 4)
        this.angle = Math.random() * 2;
        // for sin and cos angle, a radian value, radian * 180/pi = degree
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7;  // the curve moves up and down
    }
    update()  // shared class method
    {
        // making enemy move from right to left
        this.x -= this.speed;
        // waving at the y-axis
        this.y += this.curve * Math.sin(this.angle); // random * Math.sin(this.angle) will make the curve more obvious or less
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) // when an enemy flies out the canvas, it gets reset
        {
            this.x = canvas.width;
        }
    }
    draw()
    {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
        // src, srcX, srcY, srcWidth, srcHeight, canvas.x, canvas.y, canvas.width, canvas.height;
        // animate sprites;
        if (gameFrame % this.flapSpeed === 0)
        {
            // increment to next sprite frame every random loop,
            // slow down the flapping at a random numberfor all
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
        // animate sprites;
    }
}
for (let i = 0; i < numberOfEnemies; i++)
{
    enemiesArray.push(new Enemy());
}


function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemiesArray.forEach(enemy =>
    {
        enemy.draw();
        enemy.update();
    });
    gameFrame++;
    requestAnimationFrame(animate);

}
animate();