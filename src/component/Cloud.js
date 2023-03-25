import img from "../image/cloud.png";
export class Cloud {
  speed = 3;
  hide = false;

  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }
  //for hiding clouds after off the screen
  isHide = () => {
    if (this.yPos > 768) {
      return true;
    }
    if (this.xPos < -300) {
      return true;
    }
  };
  // for updating or spawning clouds content when game started
  update = () => {
    if (this.hide) return;
    this.xPos -= this.speed;

    if (!this.hide && this.isHide()) {
      this.hide = true;
    }
  };
  // for drawing image cloud in canvas
  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.xPos, this.yPos, 300, 300);
  };
}

export default Cloud;
