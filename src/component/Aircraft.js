import img from "../image/aircraft.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import song from '../audio/backgroundSong.mp3'
export class Aircraft {
  dead = false;
  fuel = 10;
  star = 0;
  speed = 25;
  navigate = useNavigate();
  inputField = "";
  time = 0;
  response = "";
  dataPlayer = {};
  listPLayers = {};
  state = {
    audio: new Audio(song),
    isPlaying : false
  }

  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }
  // for increasing the fuel
  increaseFuel = () => {
    this.fuel += 10;
  };
  // for decreasing the fuek
  decreaseFuel = () => {
    this.fuel -= 1;
  };
  // for increasing the stars
  increaseStar = () => {
    this.star += 1;
  };
  // for increasing the time
  increaseTime = () => {
    this.time += 1;
  };
  // for playing and pausing the sound
  sound = () => {
    if(this.state.isPlaying){
      this.state.audio.pause()
    }else{
      this.state.audio.play()
    }
    this.state.isPlaying = !this.state.isPlaying
    this.state.audio.loop = true
  }
  // for storing the user data
  rankingPlayer = () => {
    this.listPLayers = JSON.parse(localStorage.getItem("user data"));
    if (!this.listPLayers) {
      this.dataPlayer = {
        id: uuidv4(),
        name: this.inputField,
        time: this.time,
        stars: this.star,
      };
      this.listPLayers = [this.dataPlayer];
    } else {
      this.dataPlayer = {
        id: uuidv4(),
        name: this.inputField,
        time: this.time,
        stars: this.star,
      };
      this.listPLayers = [...this.listPLayers, this.dataPlayer];
    }
    localStorage.setItem("user data", JSON.stringify(this.listPLayers));
  };
  // for clicking continue button and storing the user data
  handleClick = () => {
    if (this.inputField !== "") {
      axios
        .post(" http://xxxxxxxxx/register.php", {
          name: this.inputField,
          time: this.time,
          star: this.star,
        })
        .then((res) => {
          // if base url is proper
          localStorage.setItem("user data", JSON.stringify(res.data));
          this.navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          this.rankingPlayer();
          this.navigate("/");
          window.location.reload();
        });
    }
  };
  // for geting character from input field
  handleOnChange = (e) => {
    this.inputField = e.target.value;
  };
  // for feature gameover
  gameOver = () => {
    this.sound()
    document.body.innerHTML = `
    <div class="flex flex-col justify-center items-center">
    <br/>
    <h2 class= "font-bold text-[30px] mb-6">Game Over!</h2>
    <p class= "text-[20px] mb-6">Your Stars: ${this.star}</p>
    <p class= "text-[20px] mb-6">Your Time: ${this.time} </p>
    <div class="flex flex-col justify-center items-center">
    <p class= "text-[25px] mb-2 font-semibold">Username</p>
    <input id="myInput"  class="w-[180px] h-[30px] border-[2px] border-black rounded-md mb-6 p-2"/>
    <button id="myButton" class="w-[100px] h-[40px] bg-red-500 rounded-md text-white shadow-xl shadow-black/[25%]">Continue</button>
    </div>
    </div>
    `;
    document
      .getElementById("myButton")
      .addEventListener("click", () => this.handleClick());
    document
      .getElementById("myInput")
      .addEventListener("input", (e) => this.handleOnChange(e));
  };
  // for updating aircraft content with action
  update = () => {
    document.onkeydown = (e) => {
      if (e.keyCode === 39) {
        this.posX += this.speed;
      }
      if (e.keyCode === 37) {
        this.posX -= this.speed;
      }
      if (e.keyCode === 40) {
        this.posY += this.speed;
      }
      if (e.keyCode === 38) {
        this.posY -= this.speed;
      }
    };

    if (this.fuel <= 0) {
      this.dead = true;
      this.gameOver(this.star);
    }

    if (this.posX <= 0) {
      this.posX = 0;
    }

    if (this.posX >= 930) {
      this.posX = 930;
    }

    if (this.posY <= -15) {
      this.posY = -15;
    }

    if (this.posY >= 690) {
      this.posY = 690;
    }
  };
  // for drawing image aircraft and content in canvas
  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.posX, this.posY, 100, 100);

    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Star: ${this.star}`, 20, 35);

    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Fuel: ${this.fuel}`, 20, 70);

    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Time: ${this.time}`, 900, 35);
  };
}

export default Aircraft;
