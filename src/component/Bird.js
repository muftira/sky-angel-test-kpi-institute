import img from "../image/bird.png";
export class Bird {
  speed = 4;
  dead = false;

  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }
  // for hiding bird after off the screen
  isDead = () => {
    if (this.yPos > 768) {
      return true;
    }
    if (this.xPos < -50) {
      return true;
    }
  };
  // for updating or spawning bird content when game started
  update = (aircraft) => {
    if (this.dead) return;
    this.xPos -= this.speed;

    if (!this.dead && this.isDead()) {
      this.dead = true;
    }

    if (!this.dead) {
      if (
        Math.abs(aircraft.posX - this.xPos) < 65 &&
        Math.abs(aircraft.posY - this.yPos) < 40
      ) {
        this.dead = true;
        aircraft.dead = true;
        aircraft.gameOver();
      }
    }
  };
  // for drawing image bird in canvas
  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.xPos, this.yPos, 50, 50);
  };
}

export default Bird;
