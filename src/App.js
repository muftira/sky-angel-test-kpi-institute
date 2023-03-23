import React, { useEffect } from 'react';
// import './App.css';
import bg from './image/background.jpg';
import Aircraft from './component/Aircraft';
import Bird from './component/Bird';
import Cloud from './component/Cloud';
import Parachute from './component/Parachute';
import Star from './component/Star';

function App() {
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
  const randomNumber = (min,max) => Math.random() * max + min;
  
  let birds = []
  let clouds = []
  let parachutes = []
  let stars = []

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    canvas = document.getElementById("myCanvas");

    

    setInterval(() => {    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,1024,768);

      const random = randomNumber(0,700);

      if(clouds.length < maxCloudCount && (Date.now() - lastCloudSpawnAt) > 1500){
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

      if(parachutes.length < maxParachuteCount && (Date.now() - lastParachuteSpawnAt) > 5000){
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

      
      

    }, 1000 / 30);
  })
  return (
    <div style={{
      display:'flex',justifyContent:'center',alignItems:'center',height:'100%',flexDirection:'row'
      }}>
          <canvas id="myCanvas" width="1024" height="768" style={{backgroundImage: `url(${bg})`,backgroundSize:"cover" ,border:'2px solid #000000',marginTop:'48px'}}/>
      </div>
  );
}

export default App;
