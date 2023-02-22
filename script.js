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
        this.image.src = "enemies/enemy1.png";
        // this.speed = Math.random() * 4 - 2; // range (-2, 2)
        this.spriteWidth = 1758 / 6;
        this.spriteHeight = 155;
        this.size = Math.random();  // different size for each enemy
        this.width = this.spriteWidth * this.size;
        this.height = this.spriteHeight * this.size;
        this.x = Math.random() * (canvas.width - this.width); // keeping all enemy image within the canvas
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // range (1, 4)
    }
    update()  // shared class method
    {
        // x and y here is re-updating the location
        this.x += Math.random() * 5 - 2.5;  // range (-7.5, 7.5) at x-axis and (-5, 5) for y-axis
        this.y += Math.random() * 5 - 2.5;  // this will make the enemy up down left right shaky
    }
    draw()
    {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.width,
            this.height);
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