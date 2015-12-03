window.onload = ->

  DISTANCE = 10
  HINT1 = 20
  HINT2 = 40

  themeElem = document.getElementById('theme')
  answerElem = document.getElementById('answer')
  timerElem = document.getElementById('timer')
  xElem = document.getElementById('x')
  yElem = document.getElementById('y')
  zElem = document.getElementById('z')
  dElem = document.getElementById('d')

  theme = []
  time = 0;

  rnd = (num)->
    Math.random() * num << 0

  setTheme = ->
    theme = [rnd(255), rnd(255), rnd(255)]
    return

  setColor = (ar)->
    themeElem.style.background = "rgb(#{ar[0]},#{ar[1]},#{ar[2]})"
    timerElem.style.color = "rgb(#{255-ar[0]},#{255-ar[1]},#{255-ar[2]})"
    return

  setTimer = ->
    time = 0;
    timerElem.textContent = time
    setInterval( ->
      time++
      timerElem.textContent = time
    , 1000)
    return

  reset = ->
    setTheme()
    setColor(theme)
    resetHint()
    setTimer()
    return

  resetHint = ->
    themeElem.setAttribute 'show', 'off'
    answerElem.setAttribute 'show', 'off'
    setTimeout( ->
      answerElem.setAttribute 'show', 'on'
    , HINT1 * 1000)
    setTimeout( ->
      themeElem.setAttribute 'show', 'on'
    , HINT2 * 1000)
    return

  checkColor = (theme, color)->
    console.log theme
    rL = theme[0] - color[0]
    gL = theme[1] - color[1]
    bL = theme[2] - color[2]
    l = Math.sqrt(rL*rL + gL*gL + bL*bL)
    dElem.textContent = l << 0
    if l < DISTANCE
      return true
    else
      return false

  deviceorientationHandler = (event)->
    beta = event.beta
    gamma = event.gamma
    alpha = event.alpha
    r = (beta + 80) * 255 / 160 << 0
    r = 0 if r < 0
    r = 255 if r > 255
    g = (gamma + 90) * 255 / 180 << 0
    g = 0 if g < 0
    g = 255 if g > 255
    b = alpha
    if b > 180
      b = 440 - b
    else
      b = 80 - b
    b = b * 255 / 160 << 0
    b = 0 if b < 0
    b = 255 if b > 255
    color = "rgb(#{r},#{g},#{b})"
    answerElem.style.background = color

    if checkColor(theme, [r, g, b])
      alert "Congrats!!\ntime: #{time}"
      reset()

    xElem.textContent = r
    yElem.textContent = g
    zElem.textContent = b
    return

  reset()
  window.addEventListener 'deviceorientation', deviceorientationHandler
  return