import {useState, useEffect} from 'react'
import './App.css'

function App() {

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [paused, setPaused] = useState(true)
  // timeLeft state is measured in seconds
  const [timeLeft, setTimeLeft] = useState(1500)
  // resets break and session length and stops timer
  const resetClickHandler = () => {
    setBreakLength(5)
    setSessionLength(25)
    setTimeLeft(1500)
    setPaused(true)
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
    }
  }

  const sessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
    }
  }

  const formatTimeLeft = () => {
    let minutes = Math.floor(timeLeft / 60)
    let seconds = Math.floor(timeLeft % 60)
    if (minutes < 10) {minutes = "0" + minutes}
    if (seconds < 10) {seconds = "0" + seconds}

    let formattedSeconds = minutes + ":" + seconds
    return formattedSeconds
  }

  let timeLeftFormatted = formatTimeLeft()

  useEffect(() => {
    let timeout

    if (!paused) {
      timeout = setTimeout(() => {
        if (timeLeft == 0) {
          setPaused(true)
        } else if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1)
        }
      }, 1000)
    } else {
      clearTimeout(timeout)
    }
  })

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
        <p id="timer-label">Session</p>
        <p id="time-left">{timeLeftFormatted}</p>
        <button id="start_stop" onClick={startStopClickHandler}>>||</button>
        <button id="reset" onClick={resetClickHandler}>reset</button>
      </div>
    </div>
  )
}

export default App;
