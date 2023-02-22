/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;
const numberOfEnemies = 10;
const enemiesArray = [];

let gameFrame = 0;

class Enemy
{
    constructor()
    {
        this.image = new Image();
        this.image.src = "enemies/enemy4.png";
        this.speed = Math.random() * 4 + 1; // range (-2, 2)
        this.spriteWidth = 1917 / 9;
        this.spriteHeight = 212;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (canvas.width - this.width); // keeping all enemy image within the canvas
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);

        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // range (1, 4)
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update()  // shared class method
    {
        if (gameFrame % this.interval === 0) // every 30 loops, get a newX and newY location
        {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }
        let dx = this.x - this.newX;   // calculate the distance
        let dy = this.y - this.newY;

        this.x -= dx / 70;       // reset the x and y to newX and newY by traveling
        this.y -= dy / 70;      // without / 20, is instant move, with /20, is traveling

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