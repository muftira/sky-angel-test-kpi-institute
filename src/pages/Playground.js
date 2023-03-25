import React, { useEffect, useState } from "react";
import bg from "../image/background.jpg";
import Aircraft from "../component/Aircraft";
import Bird from "../component/Bird";
import Cloud from "../component/Cloud";
import Parachute from "../component/Parachute";
import Star from "../component/Star";

function Playground() {
  const [startbutton, setStartButton] = useState(false);

  let rankingPlayers = JSON.parse(localStorage.getItem("user data"));

  let intervalContent = null;
  let intervalTime = null;
  let isPlay = false;

  let canvas;
  let ctx;

  let maxBirdCount = 20;
  let maxCloudCount = 20;
  let maxParachuteCount = 10;
  let maxStarCount = 10;

  let lastBirdSpawnAt = Date.now();
  let lastCloudSpawnAt = Date.now();
  let lastParachuteSpawnAt = Date.now();
  let lastStarSpawnAt = Date.now();

  const aircraft = new Aircraft(30, 250);

  const randomNumber = (min, max) => Math.random() * max + min;

  let birds = [];
  let clouds = [];
  let parachutes = [];
  let stars = [];

  // for feature Ranking of players
  function Ranking() {
    let rankingSortStars =
      rankingPlayers && rankingPlayers.sort((a, b) => a.time - b.time);
    let reverseRankingSortStar = rankingSortStars && rankingSortStars.reverse();
    let rankingSortTime =
      reverseRankingSortStar &&
      reverseRankingSortStar.sort((a, b) => a.stars - b.stars);
    let _rangkingPlayers = rankingSortTime && rankingSortTime.reverse();

    let currentCount = -1;
    let currentRank = 0;
    let gap = 1;

    let PlayerList =
      _rangkingPlayers &&
      _rangkingPlayers.map((player) => {
        let result = { ...player };
        if (currentCount !== result.stars + result.time) {
          currentRank += gap;
          gap = 1;
        }

        result.rank = currentRank;
        currentCount = result.stars + result.time;

        return result;
      });
    return PlayerList;
  }

  // for clicking start game button
  function handleStartGame(e) {
    e.preventDefault();
    aircraft.state.audio.play()
    startContent();
    StartTime();
    setStartButton(true);
    console.log("sound", aircraft.state.isPlaying);
  }
  // for making game paused
  function clearIntervalGame() {
    clearInterval(intervalContent);
    clearInterval(intervalTime);
    intervalContent = null;
    intervalTime = null;
    aircraft.state.audio.pause()
  }
  // for starting a timer
  function StartTime() {
    if (!intervalTime) {
      intervalTime = setInterval(() => {
        aircraft.decreaseFuel();
        aircraft.increaseTime();
      }, 1000);
    }
  }
  // for starting content in game
  function startContent() {
    canvas = document.getElementById("myCanvas");
    if (!intervalContent) {
      intervalContent = setInterval(() => {
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 1024, 768);

        const random = randomNumber(0, 700);

        if (
          clouds.length < maxCloudCount &&
          Date.now() - lastCloudSpawnAt > 2000
        ) {
          clouds.push(new Cloud(1100, random));
          lastCloudSpawnAt = Date.now();
        }

        clouds = clouds.filter((cloud) => !cloud.hide);
        clouds.forEach((cloud) => {
          cloud.update();
          cloud.draw(ctx);
        });

        if (
          birds.length < maxBirdCount &&
          Date.now() - lastBirdSpawnAt > 1500
        ) {
          birds.push(new Bird(1100, random));
          lastBirdSpawnAt = Date.now();
        }

        birds = birds.filter((player) => !player.dead);
        birds.forEach((bird) => {
          bird.update(aircraft);
          bird.draw(ctx);
        });

        if (
          parachutes.length < maxParachuteCount &&
          Date.now() - lastParachuteSpawnAt > 3500
        ) {
          parachutes.push(new Parachute(random, -200));
          lastParachuteSpawnAt = Date.now();
        }

        parachutes = parachutes.filter((parachute) => !parachute.hide);
        parachutes.forEach((parachute) => {
          parachute.update(aircraft);
          parachute.draw(ctx);
        });

        if (
          stars.length < maxStarCount &&
          Date.now() - lastStarSpawnAt > 3000
        ) {
          stars.push(new Star(random, random * -1));
          lastStarSpawnAt = Date.now();
        }

        stars = stars.filter((star) => !star.hide);
        stars.forEach((star) => {
          star.update(aircraft);
          star.draw(ctx);
        });

        aircraft.update();
        aircraft.draw(ctx);

        if (aircraft.dead) {
          clearIntervalGame();
        }
      }, 1000 / 45);
    }
  }
  // for pressing spacebar to pause or continue the game
  function handleKeyDown(e) {
    if (aircraft.dead) return;
    if (e.keyCode === 32) {
      
      if (isPlay) {
        clearIntervalGame();
      } else {
        aircraft.state.audio.play()
        startContent();
        StartTime();
      }
      isPlay = !isPlay;
      setStartButton(true);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center ">
      {!startbutton ? (
        <div className="absolute w-[600px] h-[500px] p-5 border-2 border-neutral-400 bg-neutral-300 flex flex-col justify-center items-center rounded-2xl shadow-2xl shadow-black/[55%]">
          <p className="text-center text-[20px] mb-6 text-red-500">
            Press Spacebar or Click Start Game Button to Play!
          </p>
          <p className="font-bold text-[50px] mb-6">Sky Angel Game</p>
          <button
            className="w-[100px] h-[40px] bg-sky-500 rounded-md text-white font-bold shadow-xl shadow-black/[25%]"
            onClick={(e) => handleStartGame(e)}
          >
            Start Game
          </button>
          <p className="font-bold text-[30px] mt-6">Player's Ranking</p>
          <div className="overflow-y-auto">
            {Ranking() &&
              Ranking().length > 0 &&
              Ranking().map((ranking) => (
                <div
                  key={ranking.id}
                  className="flex text-center text-[20px] mt-3"
                >
                  <div className="bg-[#FFD641] p-1 border-2 border-black rounded-md">
                    <p className="text-center font-bold">
                      No: {ranking.rank} &nbsp;
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p>&nbsp; User: {ranking.name} &nbsp;</p>
                    <p>Time: {ranking.time} &nbsp;</p>
                    <p>Stars: {ranking.stars}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex w-[1024px] justify-center">
        <p className="text-center text-[20px] mb-2 text-red-500">
          Press Spacebar to pause or continue the Game
        </p>
      </div>
      <canvas
        id="myCanvas"
        width="1024"
        height="768"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          border: "2px solid #000000",
        }}
      />
    </div>
  );
}

export default Playground;
