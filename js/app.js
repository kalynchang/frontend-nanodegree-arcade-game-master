// Wins
let wins = 0;
let winsDisplay = document.querySelector('.wins');
winsDisplay.textContent = `Wins: ${wins}`;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // Reset bug position once they reach the end of the board
    if (this.x > 505) {
        this.x = -50;
    }
    // If player collides with bug, reset position and set wins counter to 0
    const left = this.x - 75;
    const right = this.x + 75;
    const top = this.y - 50;
    const bot = this.y + 50;
    if (player.x < right && player.x > left && player.y < bot && player.y > top) {
        player.reset();
        wins = 0;
        winsDisplay.textContent = `Wins: ${wins}`;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
};

Player.prototype.reset = function() {
    // Reset positions to initial positions
    this.x = 202;
    this.y = 404;
}

Player.prototype.update = function() {
    // If player reaches the water, reset position and increment wins counter
    if (this.y === -11) {
        this.reset();
        wins += 1;
        winsDisplay.textContent = `Wins: ${wins}`;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    // Move by one square left, right, up or down
    // Keeps player inside the game board
    let updated;
    if (input === 'left') {
      updated = this.x - 101;
      this.x = updated < 0 ? this.x : updated;
    } else if (input === 'right') {
      updated = this.x + 101;
      this.x = updated >= 505 ? this.x : updated;
    } else if (input === 'up') {
      updated = this.y - 83;
      this.y = updated < -11 ? this.y : updated;
    } else if (input === 'down') {
      updated = this.y + 83;
      this.y = updated >= 487 ? this.y : updated;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy = new Enemy(-50, 60, 40);
const enemy1 = new Enemy(-50, 145, 90);
const enemy2 = new Enemy(-50, 230, 140);
const enemy3 = new Enemy(-350, 60, 65);
const enemy4 = new Enemy(-350, 145, 40);
const enemy5 = new Enemy(-350, 230, 90);

const allEnemies = [enemy, enemy1, enemy2, enemy3, enemy4, enemy5];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
