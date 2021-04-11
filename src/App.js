import {useState, useEffect} from 'react'
import beep from './sounds/beep.wav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faAngleUp, faAngleDown, faPlay, faPause, faUndo} from '@fortawesome/free-solid-svg-icons'
import './App.css'

library.add(faAngleUp, faAngleDown, faPlay, faPause, faUndo)

function App() {
  // breakLength and sessionLength are measured in minutes
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  // timeLeft is measured in seconds
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60)
  const [paused, setPaused] = useState(true)
  const [pauseOrPlay, setPauseOrPlay] = useState("play")
  const [sessionOrBreak, setSessionOrBreak] = useState("Session")
  const [timerLabel, setTimerLabel] = useState(sessionOrBreak + " Timer")
  let beepSound = document.getElementById("beep")
  let timerClass = ""
  if (timeLeft < 60) {
    timerClass = "timer-end"
  } else {
    timerClass = ""
  }
  // resets break and session length and stops timer
  const resetClickHandler = () => {
    setBreakLength(5)
    setSessionLength(25)
    setTimeLeft(1500)
    setPaused(true)
    setPauseOrPlay("play")
    setSessionOrBreak("Session")
    setTimerLabel("Session Timer")
    beepSound = document.getElementById("beep")
    beepSound.pause()
    beepSound.currentTime = 0
  }

  const startStopClickHandler = () => {
    paused ? setPaused(false) : setPaused(true)
    pauseOrPlay == "play" ? setPauseOrPlay("pause") : setPauseOrPlay("play")
  }

  const breakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1)
    }
  }

  const breakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  }

  const sessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 60)
    }
  }

  const sessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 60)
    }
  }
  // helper function that translates timeLeft to mm:ss format
  const formatTimeLeft = () => {
    let minutes = Math.floor(timeLeft / 60)
    let seconds = Math.floor(timeLeft % 60)
    if (minutes < 10) {minutes = "0" + minutes}
    if (seconds < 10) {seconds = "0" + seconds}

    let formattedSeconds = minutes + ":" + seconds
    return formattedSeconds
  }

  let timeLeftFormatted = formatTimeLeft()
  // timer logic
  useEffect(() => {
    let interval = null
    if (!paused) {
      // function that handles the actual clock timer
      if (timeLeft == 0) {
        beepSound.play()
        if (sessionOrBreak == "Session") {
          setSessionOrBreak("Break")
          setTimeLeft(breakLength * 60)
          setTimerLabel("Break Timer")
        } else {
          setSessionOrBreak("Session")
          setTimeLeft(sessionLength * 60)
          setTimerLabel("Session Timer")
        }
      } else {
        interval = setInterval(() => {
          setTimeLeft(timeLeft - 1)
        }, 1000)
      }
    }
    return () => clearInterval(interval)
  }, [paused, timeLeft])

  return (
    <div id="clock">
      <header>
        <h1>Pomodoro Timer</h1>
      </header>
      <div id="clock-wrapper">
        <div id="break-label" className="button-group">
          <h3>Break Length</h3>
          <i id="break-increment" onClick={breakIncrement}><FontAwesomeIcon icon="angle-up" size="3x" /></i>
          <h3 id="break-length">{breakLength}</h3>
          <i id="break-decrement" onClick={breakDecrement}><FontAwesomeIcon icon="angle-down" size="3x" /></i>
        </div>
        <div id="session-label" className="button-group">
          <h3>Session Length</h3>
          <i id="session-increment" onClick={sessionIncrement}><FontAwesomeIcon icon="angle-up" size="3x" /></i>
          <h3 id="session-length">{sessionLength}</h3>
          <i id="session-decrement" onClick={sessionDecrement}><FontAwesomeIcon icon="angle-down" size="3x" /></i>
        </div>
        <div id="timer-wrapper" className={timerClass}>
          <audio src={beep} type="audio/x-wav" id="beep" class="clip"/>
          <h2 id="timer-label">{timerLabel}</h2>
          <h3 id="time-left">{timeLeftFormatted}</h3>
          <i id="start_stop" onClick={startStopClickHandler}><FontAwesomeIcon icon={pauseOrPlay} size="lg" /></i>
          <i id="reset" onClick={resetClickHandler}><FontAwesomeIcon icon="undo" size="lg" /></i>
        </div>
      </div>
      <footer>
        <p>Beep sound effect by Eponn from freesound.org: https://freesound.org/people/Eponn/sounds/531511/</p>
      </footer>
    </div>
  )
}

export default App;
