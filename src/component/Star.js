import img from "../image/star.png";
export class Star {
  speed = 3;
  hide = false;

  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }
  //for hiding star after off the screen
  isHide = () => {
    if (this.xPos > 1024) {
      return true;
    }
    if (this.yPos > 760) {
      return true;
    }
  };
  // for updating or spawning stars content when game started
  update = (aircraft) => {
    if (this.hide) return;
    this.yPos += this.speed;

    if (!this.hide && this.isHide()) {
      this.hide = true;
    }

    if (!this.hide) {
      if (
        Math.abs(aircraft.posX - this.xPos) < 65 &&
        Math.abs(aircraft.posY - this.yPos) < 40
      ) {
        this.hide = true;
        aircraft.increaseStar();
      }
    }
  };
  // for drawing image star in canvas
  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.xPos, this.yPos, 40, 30);
  };
}

export default Star;
