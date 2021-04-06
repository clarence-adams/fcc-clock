import {useState, useEffect} from 'react'
import beep from './sounds/beep.wav'
import './App.css'

function App() {
  // breakLength and sessionLength are measured in minutes
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  // timeLeft is measured in seconds
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60)
  const [paused, setPaused] = useState(true)
  const [sessionOrBreak, setSessionOrBreak] = useState("Session")
  const [timerLabel, setTimerLabel] = useState(sessionOrBreak + " Timer")
  let beepSound = document.getElementById("beep")
  // resets break and session length and stops timer
  const resetClickHandler = () => {
    setBreakLength(5)
    setSessionLength(25)
    setTimeLeft(1500)
    setPaused(true)
    setSessionOrBreak("Session")
    setTimerLabel("Session Timer")
    beepSound = document.getElementById("beep")
    beepSound.pause()
    beepSound.currentTime = 0
  }

  const startStopClickHandler = () => {
    paused ? setPaused(false) : setPaused(true)
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
      <div id="break-label" className="button-group">
        <p>Break Length</p>
        <button id="break-increment" onClick={breakIncrement}>+</button>
        <p id="break-length">{breakLength}</p>
        <button id="break-decrement" onClick={breakDecrement}>-</button>
      </div>
      <div id="session-label" className="button-group">
        <p>Session Length</p>
        <button id="session-increment" onClick={sessionIncrement}>+</button>
        <p id="session-length">{sessionLength}</p>
        <button id="session-decrement" onClick={sessionDecrement}>-</button>
      </div>
      <div id="clock-wrapper">
        <audio src={beep} type="audio/x-wav" id="beep" class="clip"/>
        <p id="timer-label">{timerLabel}</p>
        <p id="time-left">{timeLeftFormatted}</p>
        <button id="start_stop" onClick={startStopClickHandler}>>||</button>
        <button id="reset" onClick={resetClickHandler}>reset</button>
      </div>
    </div>
  )
}

export default App;
