import img from '../image/aircraft.png'
import { useNavigate } from 'react-router-dom';
export class Aircraft{
    dead = false;
    fuel = 10;
    star = 0;
    speed = 25;
    navigate = useNavigate()
    inputField = "";
    
    

    constructor(posX,posY){
        this.posX = posX;
        this.posY = posY;
        // this.navigate = useNavigate()
    }

    increaseFuel = () => {
        this.fuel += 10
    }

    decreaseFuel = () => {
        this.fuel -= 1
    }

    increaseStar = () =>{
        this.star += 1
    }

    handleClick = () => {
        
        if(!this.inputField ===""){
            this.navigate('/')
            window.location.reload()
        } 
    }

    handleOnChange = (e) => {
        this.inputField = e.target.value
        
    }

    

    gameOver = (_star) => {


        

        // function handleOnChange(e, inputField){
            
            
        // }

        // function handleClick(inputField) {
            
            
            
        // }
        
        
        document.body.innerHTML = `
    <div class="flex flex-col justify-center items-center">
    <br/>
    <h2 class= "font-bold text-[30px] mb-6">Game Over!</h2>
    <p class= "text-[20px] mb-6">Your star: ${_star}</p>
    <p class= "text-[20px] mb-6">Your time: 0 </p>
    <div class="flex flex-col justify-center items-center">
    <p class= "text-[20px] mb-3 font-semibold">User Name</p>
    <input id="myInput"  class="w-[180px] h-[30px] border-[2px] border-black rounded-md mb-6 p-2"/>
    <button id="myButton" class="w-[100px] h-[40px] bg-red-500 rounded-md text-white shadow-xl shadow-black/[25%]">Continue</button>
    </div>
    </div>
    `
    document.getElementById("myButton").addEventListener("click", () => this.handleClick());
    document.getElementById("myInput").addEventListener("input", (e) => this.handleOnChange(e));
    }

    update = () =>{
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
        }
        
        if(this.fuel <= 0){
            this.dead = true
            this.gameOver(this.star)
        }

        if(this.posX <= 0 ){
            this.posX = 0
        }

        if(this.posX >= 930){
            this.posX = 930
        }

        if(this.posY <= -15){
            this.posY = -15
        }

        if(this.posY >= 690){
            this.posY = 690
        }
        
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