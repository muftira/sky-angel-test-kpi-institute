import React, { useEffect, useState } from 'react';
// import './App.css';
import bg from '../image/background.jpg';
import Aircraft from '../component/Aircraft';
import Bird from '../component/Bird';
import Cloud from '../component/Cloud';
import Parachute from '../component/Parachute';
import Star from '../component/Star';

function Playground() {
  // const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(true)

  let intervalContent = null;
  let isStart = false;
  let canvas;
  let ctx;
  let maxBirdCount = 20;
  let maxCloudCount = 20
  let maxParachuteCount = 10
  let maxStarCount = 10

  let lastBirdSpawnAt = Date.now();
  let lastCloudSpawnAt = Date.now()
  let lastParachuteSpawnAt = Date.now()
  let lastStarSpawnAt = Date.now()
  
  const aircraft = new Aircraft(30,250)
  // const bird = new Bird()
  const randomNumber = (min,max) => Math.random() * max + min;

  let birds = []
  let clouds = []
  let parachutes = []
  let stars = []

  
    const handleClick = (e) => {
        e.preventDefault()
        return setTimerOn(!timerOn)
    }

    // window.onkeydown = (e) =>{
    //     if(e.keyCode === 32) {
    //         return setTimerOn(!timerOn)    
    //     }
    //   }

  setInterval(() => {
    aircraft.decreaseFuel()
}, 1000)

function clearIntervalGame() {
  clearInterval(intervalContent);
  intervalContent = null;
}

function startGame(){
    canvas = document.getElementById("myCanvas");
    if(!intervalContent){
      intervalContent = setInterval(() => {
        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,1024,768);

        const random = randomNumber(0,700);

        if(clouds.length < maxCloudCount && (Date.now() - lastCloudSpawnAt) > 2000){
          clouds.push( new Cloud(1100, random));
          lastCloudSpawnAt = Date.now();
        }

        clouds = clouds.filter(cloud => !cloud.hide)
        clouds.forEach(cloud => {
          cloud.update();
           cloud.draw(ctx)
        })
                    
        if(birds.length < maxBirdCount && (Date.now() - lastBirdSpawnAt) > 1500){
          birds.push(new Bird(1100, random));
          lastBirdSpawnAt = Date.now();
        }
              
        birds = birds.filter((player) => !player.dead);
        birds.forEach(bird => {
          bird.update(aircraft);
          bird.draw(ctx);
        });
              
        if(parachutes.length < maxParachuteCount && (Date.now() - lastParachuteSpawnAt) > 3500){
          parachutes.push(new Parachute(random, -200));
          lastParachuteSpawnAt = Date.now();
        }

        parachutes = parachutes.filter(parachute => !parachute.hide)
        parachutes.forEach(parachute => {
          parachute.update(aircraft)
          parachute.draw(ctx)
        })
              
        if(stars.length < maxStarCount && (Date.now() - lastStarSpawnAt) > 3000){
          stars.push(new Star(random, random * -1));
          lastStarSpawnAt = Date.now()
        }
              
        stars = stars.filter(star => !star.hide)
          stars.forEach(star => {
            star.update(aircraft)
            star.draw(ctx)
        })
                    
        aircraft.update();
        aircraft.draw(ctx);
        
        if(aircraft.dead){
          clearIntervalGame();
        }

      }, 1000 / 30)
    }
}

function handleKeyDown(e){
  if(e.keyCode === 32){
    if(aircraft.dead) return;
    if(isStart){
      clearIntervalGame()
    }else{
      startGame()
    }
    isStart = !isStart
  }
}

useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);

  // return () => {
  //   window.removeEventListener('keydown', handleKeyDown);
  //   // document.exitFullscreen();
  // };
}, []);





  // useEffect(() => {
    
  //   canvas = document.getElementById("myCanvas");
  //   let intervalContent = null;
  //   let intervalTimer = null;

  //   // if(timerOn){
        
  //   // }else{
  //   //     clearInterval(intervalTimer)
  //   // }

  //   if(timerOn){
  //       intervalContent = setInterval(() => {    
            
  //           ctx = canvas.getContext("2d");
  //           ctx.clearRect(0,0,1024,768);
      
  //           const random = randomNumber(0,700);
      
  //           if(clouds.length < maxCloudCount && (Date.now() - lastCloudSpawnAt) > 2000){
  //             clouds.push( new Cloud(1100, random));
  //             lastCloudSpawnAt = Date.now();
  //           }
  //           clouds = clouds.filter(cloud => !cloud.hide)
  //           clouds.forEach(cloud => {
  //             cloud.update();
  //             cloud.draw(ctx)
  //           })
            
  //           if(birds.length < maxBirdCount && (Date.now() - lastBirdSpawnAt) > 1500){
  //             birds.push(new Bird(1100, random));
  //             lastBirdSpawnAt = Date.now();
  //           }
      
  //           birds = birds.filter((player) => !player.dead);
  //           birds.forEach(bird => {
  //             bird.update(aircraft);
  //             bird.draw(ctx);
  //           });
      
  //           if(parachutes.length < maxParachuteCount && (Date.now() - lastParachuteSpawnAt) > 3500){
  //             parachutes.push(new Parachute(random, -200));
  //             lastParachuteSpawnAt = Date.now();
  //           }
  //           parachutes = parachutes.filter(parachute => !parachute.hide)
  //           parachutes.forEach(parachute => {
  //             parachute.update(aircraft)
  //             parachute.draw(ctx)
  //           })
      
  //           if(stars.length < maxStarCount && (Date.now() - lastStarSpawnAt) > 3000){
  //             stars.push(new Star(random, random * -1));
  //             lastStarSpawnAt = Date.now()
  //           }
      
  //           stars = stars.filter(star => !star.hide)
  //           stars.forEach(star => {
  //             star.update(aircraft)
  //             star.draw(ctx)
  //           })
            
  //           aircraft.update();
  //           aircraft.draw(ctx);

  //           if(aircraft.dead){
  //               setTimerOn(false)
  //           }
      
  //         }, 1000 / 35);
  //   }else{
  //       clearInterval(intervalContent)
  //   }

  //   return () => clearInterval(intervalContent)
    
  // }, [timerOn])

  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center'>
        <div className='flex w-[1024px] justify-center mb-5'>
        <button onClick={(e) => handleClick(e)} className='self-start font-bold w-[100px] h-[40px] bg-red-500 rounded-md text-white shadow-xl shadow-black/[25%]'>Pause Game</button>
        </div>
        
        <canvas id="myCanvas" width="1024" height="768" style={{backgroundImage: `url(${bg})`,backgroundSize:"cover" ,border:'2px solid #000000'}}/>
      </div>
  );
}

export default Playground;
