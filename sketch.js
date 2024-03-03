let osc, playing, freq, amp;
let angle = 0;
let wave = [];
let cnv;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator('sine');
}

function draw() {
  background(220);
  freq = map((mouseY > 100) ? mouseY - 100 : 0, 0, windowHeight - 100, 20000, 0);
  
  fill(0);
  rect(100, 100, windowWidth - 100, windowHeight - 100)

  text('click here to play sound', 20, 20);
  
  fill(255);
  textSize(20);
  textFont('Helvetica');
  text('20000', 110, 120);
  text('20', 110, windowHeight - 10);
  
  
  if((mouseX > 100) && (mouseY > 100)) {
    osc.freq(freq, 0.1);
    if (!playing) {
      playOscillator();
    }
  } else {
    if (playing) {
      stopOscillator();
      playing = false;
    }
  }
  
  translate(100, windowHeight / 2);
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    vertex(i * 10, wave[i] * 2);
  }
  endShape();

  if (playing) {
    for (let i = 0; i < 4; i++) { // Draw more cycles per frame
      let y = sin(angle) * 50; // Adjust amplitude for faster oscillation
      wave.unshift(y);
      if (wave.length > windowWidth - 100) { // Modify this condition
        wave.pop();
      }
      angle += TWO_PI * freq / 44100;
    }
}
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  playing = true;
  osc.start();
}

function stopOscillator() {
  playing = false;
  osc.stop();
}