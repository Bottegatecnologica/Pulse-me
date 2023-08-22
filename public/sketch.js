var intersectionBoxes = [];
var rows = 5;
var columns = 9;
var waves = [];
var socket;
var userNumbers = [];
var boxWidth;
var boxHeight;
var player = Math.random();
var soglia = 10


function setup() {
 //setup cursor
  cursor(CROSS);

//User data
  userNumbers.push(floor(random(1, columns)));
  userNumbers.push(floor(random(1, rows)));
  userNumbers.push(player);

//Connection
  socket = io.connect("https://pulse-me.glitch.me");
  socket.on("generateWaves", generateWaves);

//Canvas
  createCanvas(windowWidth, windowHeight);

//Grid
  boxWidth = width / columns;
  boxHeight = height / rows;

  for (let i = 0; i < rows; i++) {
    intersectionBoxes.push([]);
    for (let j = 0; j < columns; j++) {
      intersectionBoxes[i].push(
        new IntersectionBox(boxWidth * j, boxHeight * i, boxWidth, boxHeight)
      );
    }
  }
}

//draw
function draw() {
  background("white");

//display Grid
  intersectionBoxes.forEach(row => {
    row.forEach(box => box.display());
  });

//display Player
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (i === userNumbers[0] && j === userNumbers[1]) {
        fill(255);

        circle(boxWidth * i, boxHeight * j, 10);
      }
    }
  }
 

//updating and displaying Waves
  for (let i = waves.length - 1; i >= 0; i--) {
    if (!waves[i].alive) {
      waves.splice(i, 1);
      continue;
    }
    waves[i].updateAndDisplay();
  }
}

//generator (da valutare imput audio)
function deviceShaken(){

let shouldGenerateMoreWaves = waves.filter(wave => {
    return wave.player === player;
  });

//message to socket
  if (!shouldGenerateMoreWaves.length > 0) {
    socket.emit("generateWaves", userNumbers);
    generateWaves(userNumbers);
  }
}


function mousePressed() {

//cursor vanish
noCursor();

//personal Wave limit chack
  let shouldGenerateMoreWaves = waves.filter(wave => {
    return wave.player === player;
  });

//message to socket
  if (!shouldGenerateMoreWaves.length > 0) {
    socket.emit("generateWaves", userNumbers);
    generateWaves(userNumbers);
  }
}

//true origin of the Waves
function generateWaves(userNumbers) {
  waves.push(
    new Wave(
      "right",
      92,
      intersectionBoxes[0][userNumbers[0]].x,
      intersectionBoxes[userNumbers[1]][0].y,
      userNumbers[2]
    ),
    new Wave(
      "left",
      92,
      intersectionBoxes[0][userNumbers[0]].x,
      intersectionBoxes[userNumbers[1]][0].y,
      userNumbers[2]
    ),
    new Wave(
      "bottom",
      92,
      intersectionBoxes[0][userNumbers[0]].x,
      intersectionBoxes[userNumbers[1]][0].y,
      userNumbers[2]
    ),
    new Wave(
      "top",
      92,
      intersectionBoxes[0][userNumbers[0]].x,
      intersectionBoxes[userNumbers[1]][0].y,
      userNumbers[2]
    )
  );
}
