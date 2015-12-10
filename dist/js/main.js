window.onload = function() {
  var DISTANCE, HASHTAG, HINT1, HINT2, TITLE, answerElem, checkColor, clearTimeElem, dElem, deviceorientationHandler, hint1timer, hint2timer, reset, resetHint, restart, restartElem, resultElem, rnd, setColor, setTheme, setTimer, showResult, theme, themeElem, time, timer, timerElem, tweetElem, xElem, yElem, zElem;
  DISTANCE = 10;
  HINT1 = 2;
  HINT2 = 4;
  TITLE = 'hoge';
  HASHTAG = 'fuga';
  themeElem = document.getElementById('theme');
  answerElem = document.getElementById('answer');
  timerElem = document.getElementById('timer');
  xElem = document.getElementById('x');
  yElem = document.getElementById('y');
  zElem = document.getElementById('z');
  dElem = document.getElementById('d');
  resultElem = document.getElementById('result');
  clearTimeElem = document.getElementById('clearTime');
  tweetElem = document.getElementById('tweet');
  restartElem = document.getElementById('restart');
  theme = [];
  time = 0;
  timer = false;
  hint1timer = false;
  hint2timer = false;
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
    timer = setInterval(function() {
      time++;
      return timerElem.textContent = time;
    }, 1000);
  };
  resetHint = function() {
    themeElem.setAttribute('show', 'off');
    answerElem.setAttribute('show', 'off');
    hint1timer = setTimeout(function() {
      return answerElem.setAttribute('show', 'on');
    }, HINT1 * 1000);
    hint2timer = setTimeout(function() {
      return themeElem.setAttribute('show', 'on');
    }, HINT2 * 1000);
  };
  reset = function() {
    setTheme();
    setColor(theme);
    resetHint();
    setTimer();
  };
  checkColor = function(theme, color) {
    var bL, gL, l, rL;
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
  showResult = function() {
    var b, color, g, r, str, url;
    clearInterval(timer);
    themeElem.setAttribute('show', 'off');
    answerElem.setAttribute('show', 'off');
    clearTimeout(hint1timer);
    clearTimeout(hint2timer);
    clearTimeElem.textContent = time;
    r = theme[0].toString(16);
    g = theme[1].toString(16);
    b = theme[2].toString(16);
    color = "" + r + g + b;
    str = TITLE + "を" + time + "秒でクリアー！";
    url = "https://twitter.com/intent/tweet?hashtags=" + HASHTAG + "%2c" + color + "&text=" + str + "&url=http%3A%2F%2Fmigi1982.github.io%2Fcolor%2F";
    tweetElem.setAttribute('href', url);
    resultElem.setAttribute('show', 'on');
  };
  restart = function() {
    resultElem.setAttribute('show', 'off');
    reset();
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
    g = (gamma + 90) * 255 / 180 << 0;
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
      showResult();
    }
    xElem.textContent = r;
    yElem.textContent = g;
    zElem.textContent = b;
  };
  reset();
  window.addEventListener('deviceorientation', deviceorientationHandler);
  restartElem.onclick = function() {
    restart();
  };
};
