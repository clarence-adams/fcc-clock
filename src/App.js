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
      <BreakButtonGroup breakLength={breakLength}/>
      <SessionButtonGroup sessionLength={sessionLength}/>
      <div id="clock-wrapper">
        <p id="timer-label">Session</p>
        <p id="time-left">{timeLeft}</p>
        <button id="start_stop" onClick={startStopClickHandler}>>||</button>
        <button id="reset" onClick={resetClickHandler}>reset</button>
      </div>
    </div>
  )
}

function BreakButtonGroup(props) {
  return (
    <div id="break-label" className="button-group">
      <p>Break Length</p>
      <button id="break-increment">+</button>
      <p id="break-length">{props.breakLength}</p>
      <button id="break-decrement">-</button>
    </div>
  )
}

function SessionButtonGroup(props) {
  return (
    <div id="session-label" className="button-group">
      <p>Session Length</p>
      <button id="session-increment">+</button>
      <p id="session-length">{props.sessionLength}</p>
      <button id="session-decrement">-</button>
    </div>
  )
}

export default App;
