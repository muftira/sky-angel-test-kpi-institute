import img from '../image/cloud.png'
export class Cloud {
    speed = 3;
    hide = false;

    constructor(xPos,yPos){
        this.xPos = xPos;
        this.yPos = yPos;
    }

    isHide = () =>{
        if(this.yPos > 768){
            return true;
        }
        if(this.xPos < -300){
            return true
        }
    }

    update = () => {
        if (this.hide) return;
        this.xPos -= this.speed;
        

        if(!this.hide && this.isHide()){
            this.hide = true;
        }

        
        
        // if(!this.dead){
        //     if(Math.abs(aircraft.posX - this.xPos) < 65 && Math.abs(aircraft.posY - this.yPos) < 90){
        //         this.dead = true;
        //         // aircraft.deductHealth();
        //         }
        // }
    }

    draw = (ctx) =>{
        const image = new Image();
        image.src = img;
        ctx.drawImage(image,this.xPos,this.yPos,300,300);
    }
}

export default Cloud;