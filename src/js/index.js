import Bird from './actors/Bird.js'
import Cactus from './actors/Cactus.js'
import Cloud from './actors/Cloud.js'
import config from './config.js'
import Dino from './actors/Dino.js'
import { randBoolean } from './utils.js'

import P5 from 'p5'
// import "p5/lib/addons/p5.sound"

import celerx from '../lib/celerx.js'
import seed from 'seed-random'

import font from '../assets/Montserrat-Bold.ttf'
import spriteImg from '../assets/sprite.png'
import jumpSound from '../assets/jumpsounds.mp3'

// import '../css/style.css'
// const { p5: P5 } = window

window.p5 = P5
window.config = config



// eslint-disable-next-line no-new
new P5(p5 => {
  // for resetting settings that change due to
  // difficulty increasing
  const SETTINGS_BACKUP = { ...config.settings }
  const STATE = {
    birds: [],
    cacti: [],
    clouds: [],
    dino: null,
    gameOver: false,
    groundX: 0,
    groundY: 0,
    isRunning: false,
    level: 0,
    score: 0
  }

  // eslint-disable-next-line no-unused-vars
  let PressStartFont, sprite, jumpSoundEffect

  // global references for debugging
  window.p5 = p5
  window.state = STATE

  function spriteImage (spriteName, ...clientCoords) {
    const { h, w, x, y } = config.sprites[spriteName]

    // eslint-disable-next-line no-useless-call
    return p5.image.apply(p5, [sprite, ...clientCoords, w / 2, h / 2, x, y, w, h])

  }

  setTimeout(() => {
    resetGame()
  }, 1000)

  function resetGame () {

    var match = celerx.getMatch();
    seed(match && match.sharedRandomSeed, { global: true });
    celerx.start();
    Object.assign(STATE, {
      birds: [],
      cacti: [],
      dino: new Dino(p5.height),
      gameOver: false,
      isRunning: true,
      level: 0,
      score: 0
    })

    Object.assign(config.settings, SETTINGS_BACKUP)
    p5.loop()
  }

  function endGame () {
    const padding = 15
    celerx.submitScore(STATE.score)
    p5.fill('#535353')
    p5.textAlign(p5.CENTER)
    p5.textFont(PressStartFont)
    p5.textSize(12)
    p5.text('G A M E  O V E R', (p5.width / 2), (p5.height / 2 - p5.textSize() / 2 - padding))

    STATE.isRunning = false
    p5.noLoop()
  }

  function increaseDifficulty () {
    const { settings } = config
    const { bgSpeed, cactiSpawnRate, dinoLegsRate } = settings
    const { level } = STATE

    if (level > 4 && level < 8) {
      settings.bgSpeed++
      settings.birdSpeed = settings.bgSpeed * 0.8
    } else if (level > 7) {
      settings.bgSpeed = Math.ceil(bgSpeed * 1.1)
      settings.birdSpeed = settings.bgSpeed * 0.9
      settings.cactiSpawnRate = Math.floor(cactiSpawnRate * 0.98)

      if (level > 7 && level % 2 === 0 && dinoLegsRate > 3) {
        settings.dinoLegsRate--
      }
    }
  }

  function updateScore () {
    if (p5.frameCount % config.settings.scoreIncreaseRate === 0) {
      const oldLevel = STATE.level

      STATE.score++
      STATE.level = Math.floor(STATE.score / 100)

      if (STATE.level !== oldLevel) {
        increaseDifficulty()
      }
    }
  }

  function drawGround () {
    const { bgSpeed } = config.settings
    const groundImgWidth = config.sprites.ground.w / 2

    spriteImage('ground', STATE.groundX, STATE.groundY)
    STATE.groundX -= bgSpeed

    // append second image until first is fully translated
    if (STATE.groundX <= -groundImgWidth + p5.width) {
      spriteImage('ground', (STATE.groundX + groundImgWidth), STATE.groundY)

      if (STATE.groundX <= -groundImgWidth) {
        STATE.groundX = -bgSpeed
      }
    }
  }

  function drawClouds () {
    const { clouds } = STATE

    for (let i = clouds.length - 1; i >= 0; i--) {
      const cloud = clouds[i]

      cloud.nextFrame()

      if (cloud.x <= -cloud.width) {
        // remove if off screen
        clouds.splice(i, 1)
      } else {
        spriteImage(cloud.sprite, cloud.x, cloud.y)
      }
    }

    if (p5.frameCount % config.settings.cloudSpawnRate === 0) {
      clouds.push(new Cloud(p5.width))
    }
  }

  function drawDino () {
    const { dino } = STATE
    // const {dino:dino} = STATE
    if (dino) {
      dino.nextFrame()
      spriteImage(dino.sprite, dino.x, dino.y)
    } else {
      spriteImage('dino', 45, (p5.height - (config.sprites.dino.h / 2) - 88))
    }
  }

  function drawCacti () {
    const { cacti } = STATE

    for (let i = cacti.length - 1; i >= 0; i--) {
      const cactus = cacti[i]

      cactus.nextFrame()

      if (cactus.x <= -cactus.width) {
        // remove if off screen
        cacti.splice(i, 1)
      } else {
        spriteImage(cactus.sprite, cactus.x, cactus.y)
      }
    }

    if (p5.frameCount % config.settings.cactiSpawnRate === 0) {
      // randomly either do or don't add cactus
      if (randBoolean()) {
        cacti.push(new Cactus(p5.width, p5.height))
      }
    }
  }

  function drawScore () {
    p5.fill('#535353')
    p5.textAlign(p5.CENTER)
    p5.textFont(PressStartFont)
    p5.textSize(48)
    //()
    p5.text((STATE.score + '').padStart(5, '0'), p5.width/2, p5.textSize()+4)
  }

  function drawBirds () {
    const { birds } = STATE

    for (let i = birds.length - 1; i >= 0; i--) {
      const bird = birds[i]

      bird.nextFrame()

      if (bird.x <= -bird.width) {
        // remove if off screen
        birds.splice(i, 1)
      } else {
        spriteImage(bird.sprite, bird.x, bird.y)
      }
    }

    if (p5.frameCount % config.settings.birdSpawnRate === 0) {
      // randomly either do or don't add bird
      if (randBoolean()) {
        birds.push(new Bird(p5.width, p5.height))
      }
    }
  }

  function jumpBtn(){
    this.x = p5.windowWidth-config.controls.jumpBtnX
    this.y = p5.windowHeight-config.controls.jumpBtnY
    this.r = config.controls.buttonRadius
    this.f = 'rgba(0,0,0,.2)'

    this.display = function(){
        p5.strokeWeight(2);
        p5.stroke('#ffff');
        p5.fill(this.f)

        p5.ellipse(this.x, this.y ,this.r , this.r);
        p5.line(this.x, this.y-14, this.x+15, this.y);
        p5.line(this.x, this.y-14, this.x-15, this.y);
        p5.line(this.x, this.y-14, this.x, this.y+14);

    }

    this.tap = function(){
        this.f = 'rgba(255,255,255,.2)'
        jumpSoundEffect.play();


    }
    this.tapRelease = function(){
      this.f = 'rgba(0,0,0,.2)'
      jumpSoundEffect.stop();
    }

  }

  function crouchBtn(){

    this.x = p5.windowWidth-config.controls.crouchBtnX
    this.y = p5.windowHeight-config.controls.crouchBtnY
    this.r = config.controls.buttonRadius
    this.f = 'rgba(0,0,0,.2)'

    this.display = function(){
        p5.strokeWeight(2);
        p5.stroke('#ffff');
        p5.fill(this.f)

        p5.ellipse(this.x, this.y, this.r, this.r);
        p5.line(this.x, this.y-14, this.x, this.y+14);
        p5.line(this.x, this.y+14, this.x+15, this.y);
        p5.line(this.x, this.y+14, this.x-15, this.y);
    }
  }

  // triggered on pageload
  p5.preload = () => {
    PressStartFont = p5.loadFont(font)
    sprite = p5.loadImage(spriteImg)
    p5.soundFormats('mp3', 'ogg');
    jumpSoundEffect = p5.loadSound(jumpSound);

  }

  // triggered after preload
  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)

    STATE.groundY = p5.height - config.sprites.ground.h / 2
    p5.noLoop()

    // canvas.mouseClicked(() => {
    //   if (STATE.gameOver) {
    //     resetGame()
    //   }
    // })

    // canvas.touchStarted(() => {
    //   if (STATE.gameOver) {
    //     resetGame()
    //   }
    // })
    jumpBtn = new jumpBtn();
    crouchBtn = new crouchBtn();
  }

  // triggered for every frame
  p5.draw = () => {

    p5.background('#f7f7f7')
    drawGround()
    drawClouds()
    drawCacti()

    drawDino()
    drawScore()

    // drawControl();

    jumpBtn.display();
    crouchBtn.display();

    if (STATE.level > 1) {
      drawBirds()
    }

    if (STATE.dino && STATE.dino.hits([STATE.cacti[0], STATE.birds[0]])) {
      STATE.gameOver = true
    }

    if (STATE.gameOver) {
      endGame()
    } else {
      updateScore()
    }

    //Btn
    p5.touchStarted = () => {

      let d_jumpBtn = p5.dist(p5.mouseX, p5.mouseY,p5.windowWidth-config.controls.jumpBtnX, p5.windowHeight-config.controls.jumpBtnY)
      let d_crouchBtn = p5.dist(p5.mouseX, p5.mouseY,p5.windowWidth-config.controls.crouchBtnX, p5.windowHeight-config.controls.crouchBtnY)

      if(d_jumpBtn<config.controls.buttonRadius){

        if (STATE.isRunning) {
          STATE.dino.jump()
          jumpBtn.tap();
          // jumpSoundEffect.play();

        } else {
          resetGame()
        }


      }else if(d_crouchBtn < config.controls.buttonRadius){

         if (STATE.isRunning) {
          STATE.dino.duck(true)
        }
        jumpBtn.tap.call(crouchBtn);
      }
    }

    p5.touchEnded = () =>{

      let d_crouchBtn = p5.dist(p5.mouseX, p5.mouseY,p5.windowWidth-config.controls.crouchBtnX, p5.windowHeight-config.controls.crouchBtnY)

      if(d_crouchBtn < config.controls.buttonRadius){
        if (STATE.isRunning) {
         STATE.dino.duck(false)
       }
     }
     jumpBtn.tapRelease();
     jumpBtn.tapRelease.call(crouchBtn)

    }

  }
})


//disable zooming and out
document.addEventListener("gesturestart", function (e) {
	e.preventDefault();
    document.body.style.zoom = 0.99;
});
document.addEventListener("gesturechange", function (e) {
	e.preventDefault();
  document.body.style.zoom = 0.99;
});
document.addEventListener("gestureend", function (e) {
	  e.preventDefault();
    document.body.style.zoom = 1;
});
