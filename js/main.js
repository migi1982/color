window.onload = function() {
  var DISTANCE, HINT1, HINT2, answerElem, checkColor, dElem, deviceorientationHandler, reset, resetHint, rnd, setColor, setTheme, setTimer, theme, themeElem, time, timerElem, xElem, yElem, zElem;
  DISTANCE = 10;
  HINT1 = 20;
  HINT2 = 40;
  themeElem = document.getElementById('theme');
  answerElem = document.getElementById('answer');
  timerElem = document.getElementById('timer');
  xElem = document.getElementById('x');
  yElem = document.getElementById('y');
  zElem = document.getElementById('z');
  dElem = document.getElementById('d');
  theme = [];
  time = 0;
  rnd = function(num) {
    return Math.random() * num << 0;
  };
  setTheme = function() {
    theme = [rnd(255), rnd(255), rnd(255)];
  };
  setColor = function(ar) {
    themeElem.style.background = "rgb(" + ar[0] + "," + ar[1] + "," + ar[2] + ")";
    timerElem.style.color = "rgb(" + (255 - ar[0]) + "," + (255 - ar[1]) + "," + (255 - ar[2]) + ")";
  };
  setTimer = function() {
    time = 0;
    timerElem.textContent = time;
    setInterval(function() {
      time++;
      return timerElem.textContent = time;
    }, 1000);
  };
  reset = function() {
    setTheme();
    setColor(theme);
    resetHint();
    setTimer();
  };
  resetHint = function() {
    themeElem.setAttribute('show', 'off');
    answerElem.setAttribute('show', 'off');
    setTimeout(function() {
      return answerElem.setAttribute('show', 'on');
    }, HINT1 * 1000);
    setTimeout(function() {
      return themeElem.setAttribute('show', 'on');
    }, HINT2 * 1000);
  };
  checkColor = function(theme, color) {
    var bL, gL, l, rL;
    console.log(theme);
    rL = theme[0] - color[0];
    gL = theme[1] - color[1];
    bL = theme[2] - color[2];
    l = Math.sqrt(rL * rL + gL * gL + bL * bL);
    dElem.textContent = l << 0;
    if (l < DISTANCE) {
      return true;
    } else {
      return false;
    }
  };
  deviceorientationHandler = function(event) {
    var alpha, b, beta, color, g, gamma, r;
    beta = event.beta;
    gamma = event.gamma;
    alpha = event.alpha;
    r = (beta + 80) * 255 / 160 << 0;
    if (r < 0) {
      r = 0;
    }
    if (r > 255) {
      r = 255;
    }
    g = (gamma + 180) * 255 / 360 << 0;
    if (g < 0) {
      g = 0;
    }
    if (g > 255) {
      g = 255;
    }
    b = alpha;
    if (b > 180) {
      b = 440 - b;
    } else {
      b = 80 - b;
    }
    b = b * 255 / 160 << 0;
    if (b < 0) {
      b = 0;
    }
    if (b > 255) {
      b = 255;
    }
    color = "rgb(" + r + "," + g + "," + b + ")";
    answerElem.style.background = color;
    if (checkColor(theme, [r, g, b])) {
      alert("Congrats!!\ntime: " + time);
      reset();
    }
    xElem.textContent = r;
    yElem.textContent = g;
    zElem.textContent = b;
  };
  reset();
  window.addEventListener('deviceorientation', deviceorientationHandler);
};
