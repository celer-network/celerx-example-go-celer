

export default {
  /*
   * units
   * ppf: pixels per frame
   * fpa: frames per action
   */
  settings: {
    bgSpeed: 8, // ppf
    birdSpeed: 7.2, // ppf
    birdSpawnRate: 240, // fpa
    birdWingsRate: 15, // fpa
    cactiSpawnRate: 50, // fpa
    cloudSpawnRate: 200, // fpa
    cloudSpeed: 2, // ppf
    dinoGravity: 0.5, // ppf
    dinoLegsRate: 10, // fpa
    dinoLift: 11, // ppf
    scoreIncreaseRate: 6 // fpa
  },
  sprites: {
    birdUp: { h: 63, w: 125, x: 707, y: 0 },
    birdDown: { h: 70, w: 125, x: 832, y: 0 },
    cactus: { h: 104, w: 44, x: 480, y: 0 },
    cactusDouble: { h: 82, w: 93, x: 524, y: 0 },
    cactusDoubleB: { h: 104, w: 89, x: 618, y: 0 },
    cactusTriple: { h: 62, w: 158, x: 322, y: 0 },
    cloud: { h: 51, w: 125, x: 957, y: 0 },
    dino: { h: 140, w: 107, x: 0, y: 0 },
    dinoDuckLeftLeg: { h:90, w: 162, x: 1083, y: 0 },
    dinoDuckRightLeg: { h: 92, w: 162, x: 1245, y: 0 },
    dinoLeftLeg: { h: 140, w: 107, x: 107, y: 0 },
    dinoRightLeg: { h: 140, w: 107, x: 214, y: 0 },
    ground: { h: 320, w: 2400, x: 0, y: 139 },
  },
  controls: {
    buttonRadius:56,
    jumpBtnX:64,
    jumpBtnY:40,
    crouchBtnX:160,
    crouchBtnY:40,
  }
  
  // sprites: {
  //   birdUp: { h: 52, w: 84, x: 708, y: 31 },
  //   birdDown: { h: 60, w: 84, x: 708, y: 85 },
  //   cactus: { h: 92, w: 46, x: 70, y: 31 },
  //   cactusDouble: { h: 66, w: 64, x: 118, y: 31 },
  //   cactusDoubleB: { h: 92, w: 80, x: 184, y: 31 },
  //   cactusTriple: { h: 66, w: 82, x: 266, y: 31 },
  //   cloud: { h: 28, w: 92, x: 794, y: 31 },
  //   dino: { h: 86, w: 80, x: 350, y: 31 },
  //   dinoDuckLeftLeg: { h: 52, w: 110, x: 596, y: 31 },
  //   dinoDuckRightLeg: { h: 52, w: 110, x: 596, y: 85 },
  //   dinoLeftLeg: { h: 86, w: 80, x: 432, y: 31 },
  //   dinoRightLeg: { h: 86, w: 80, x: 514, y: 31 },
  //   ground: { h: 28, w: 2400, x: 0, y: 2 },
  //   replayIcon: { h: 60, w: 68, x: 0, y: 31 }
  // }
}
