import img from '../image/aircraft.png'
export class Aircraft{
    dead = false;
    fuel = 10;
    star = 0;
    speed = 25;
    

    constructor(posX,posY){
        this.posX = posX;
        this.posY = posY;
    }

    increaseFuel = () => {
        this.fuel += 10
    }

    increaseStar = () =>{
        this.star += 1
    }

    update = (firecb) =>{
        document.onkeydown = (e) =>{
            if(e.keyCode === 39){
                this.posX += this.speed
            }
            if(e.keyCode === 37){
                this.posX -= this.speed
            }
            if(e.keyCode === 40){
                this.posY += this.speed
            }
            if(e.keyCode === 38){
                this.posY -= this.speed
            }
            
        // document.addEventListener("keypress",(e) => {
        //     if(e.keyCode === 32){
        //         if(Date.now() - this.lastFireAt > 250){
        //             firecb(this.posX + 32,this.posY);
        //             this.lastFireAt = Date.now();
        //         }
        //     }
        // })
        }
        // if(this.posX < -10 || this.posX > 890){
        //     this.dead = true
        //     gameOver(this.score);
        // }
        // if (this.health <= 0) {
        //     this.dead = true;
        //     gameOver(this.score);
        // }
    }

    draw = (ctx) => {
        const image = new Image();
        image.src = img;
        ctx.drawImage(image,this.posX,this.posY,100,100);
        
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = "black";
        ctx.fillText(`Star: ${this.star}`, 20, 35);

        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = "black";
        ctx.fillText(`Fuel: ${this.fuel}`, 20, 70);

        
    }

    gameOver = () => {
        document.body.innerHTML = `
    <center>
    <br/>
    <h2>Game Over!</h2>
    <p>Your star: ${this.star}</p>
    <button class="btn btn-danger mt-2" onClick="location.reload()">Again</button>
    </center>
    `
    }
}


// function gameOver(score) {
//     document.body.innerHTML = `
//     <center>
//     <br/>
//     <h2>Game Over!</h2>
//     <p>Your Score: ${score}</p>
//     <button class="btn btn-danger mt-2" onClick="location.reload()">Again</button>
//     </center>
//     `
// }

export default Aircraft;