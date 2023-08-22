
class Wave {
  constructor(
    direction,
    amplitude = 92,
   
    primitiveX = width / 2,
    primitiveY = height / 2,
    player,
    hue = 160
   
  ) {
    this.primitiveX = primitiveX;
    this.primitiveY = primitiveY;
    this.direction = direction;
    this.alive = true;
    this.frameCount = 0;
    this.period = random(15, 26);
    this.Radius = 0;
    this.amplitude = amplitude;
    this.y = 0;
    this.timer = 0;
    this.S = 0;
    this.player = player;
    this.updateStartAndEnd();
    this.hue = hue;
    
  
  }

  //updating and displaying
  updateAndDisplay() {

  //threshold (eliminazione1)
    if (this.amplitude < 10) {
      this.alive = false;
  //cursor appear
      cursor(CROSS);
    }
  
    //Wave leve canvas (eliminazione2)
    this.updateStartAndEnd();
    if (
      this.end[0] >= width ||
      this.end[1] >= height ||
      this.end[0] <= 0 ||
      this.end[1] <= 0 ||
      (this.S >= width && this.S >= height)
    ) {
      this.alive = false;
    }
    if (!this.alive) return;

    //displaying math
    push();
    this.frameCount += 1;

    this.timer++;

    this.S = this.timer;

    if (this.direction === "right" || this.direction === "left") {
      this.y = this.amplitude * sin(this.frameCount / this.period);
    } else {
      this.x = this.amplitude * sin(this.frameCount / this.period);
    }

    this.Radius = this.frameCount;

    translate(this.primitiveX, this.primitiveY);

    this.display();

    pop();

    this.outsideBox();
  }

  //displaying
  display() {
    if (this.direction === "right") {
      stroke(255, 0, 0);
      fill(255, 0, 0, this.hue);

      beginShape();
      curveVertex(this.S, 0);
      curveVertex(this.S, 0);
      curveVertex(this.Radius / 2 + this.S, -this.y);
      curveVertex(this.Radius + this.S, 0);
      curveVertex(this.Radius + this.S, 0);
      endShape();
    } else if (this.direction === "left") {
      stroke(255, 0, 0);
      fill(255, 0, 0, this.hue);

      beginShape();
      curveVertex(-this.S, 0);
      curveVertex(-this.S, 0);
      curveVertex(-this.Radius / 2 - this.S, this.y);
      curveVertex(-this.Radius - this.S, 0);
      curveVertex(-this.Radius - this.S, 0);
      endShape();
    } else if (this.direction === "top") {
      stroke(0, 0, 255);
      fill(0, 0, 255, this.hue);

      beginShape();
      curveVertex(0, -this.S);
      curveVertex(0, -this.S);
      curveVertex(this.x, -this.Radius / 2 - this.S);
      curveVertex(0, -this.Radius - this.S);
      curveVertex(0, -this.Radius - this.S);
      endShape();
    } else {
      stroke(0, 0, 255);
      fill(0, 0, 255, this.hue);

      beginShape();
      curveVertex(0, this.S);
      curveVertex(0, this.S);
      curveVertex(-this.x, this.Radius / 2 + this.S);
      curveVertex(0, this.Radius + this.S);
      curveVertex(0, this.Radius + this.S);
      endShape();
    }
 
  }

  //updating starting and ending point of the Wave
  updateStartAndEnd() {
    if (this.direction === "right") {
      this.end = [this.S + this.primitiveX, this.primitiveY];
      this.start = [this.end[0] + this.Radius, this.primitiveY];
    } else if (this.direction === "left") {
      this.end = [-this.S + this.primitiveX, this.primitiveY];
      this.start = [this.end[0] - this.Radius, this.primitiveY];
    } else if (this.direction === "top") {
      this.end = [this.primitiveX, this.primitiveY - this.S];
      this.start = [this.primitiveX, this.end[1] - this.Radius];
    } else {
      this.end = [this.primitiveX, this.primitiveY + this.S];
      this.start = [this.primitiveX, this.end[1] + this.Radius];
    }
   
  }

  //checking intersections
  outsideBox() {
    if (
      (this.direction === "right" || this.direction === "left") &&
      this.S + this.Radius >= intersectionBoxes[0][0].width
    ) {
      this.splitWaves();
      this.alive = false;
    } else if (
      (this.direction === "top" || this.direction === "bottom") &&
      this.S + this.Radius >= intersectionBoxes[0][0].height
    ) {
      this.splitWaves();
      this.alive = false;
    }
  }

  //splitting
  splitWaves() {
    let extrasaturation = 16;
    waves.push(
      new Wave(
        "right",
        this.amplitude / 2,
        this.start[0],
        this.start[1],
        this.player,
        this.hue/4 + extrasaturation
      ),
      new Wave(
        "left",
        this.amplitude / 2,
        this.start[0],
        this.start[1],
        this.player,
        this.hue/4 + extrasaturation
      ),
      new Wave(
        "top",
        this.amplitude / 2,
        this.start[0],
        this.start[1],
        this.player,
        this.hue/4 + extrasaturation
      ),
      new Wave(
        "bottom",
        this.amplitude / 2,
        this.start[0],
        this.start[1],
        this.player,
        this.hue/4 + extrasaturation

      )
    );
  }
}
