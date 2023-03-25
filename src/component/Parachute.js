import img from "../image/parachute.png";
export class Parachute {
  speed = 3;
  hide = false;

  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  isHide = () => {
    if (this.xPos > 1024) {
      return true;
    }
    if (this.yPos > 760) {
      return true;
    }
  };

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
        aircraft.increaseFuel();
      }
    }
  };

  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.xPos, this.yPos, 65, 65);
  };
}

export default Parachute;
