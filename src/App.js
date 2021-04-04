import {useState} from 'react'
import './App.css'

function App() {

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [paused, setPaused] = useState(true)
  const [timeLeft, setTimeLeft] = useState("25:00")
  // resets break and session length and stops timer
  const resetClickHandler = () => {
    setBreakLength(5)
    setSessionLength(25)
  }

  const startStopClickHandler = () => {
    paused ? setPaused(false) : setPaused(true)
  }
  return (
    <div id="clock">
      <BreakButtonGroup breakLength={breakLength}/>
      <SessionButtonGroup sessionLength={sessionLength}/>
      <div id="clock-wrapper">
        <p id="timer-label">Session</p>
        <p id="time-left">25:00</p>
        <button id="start_stop">>||</button>
        <button id="reset" onClick={resetClickHandler}>reset</button>
      </div>
    </div>
  )
}

function BreakButtonGroup(props) {
  return (
    <div id="break-label" class="button-group">
      <p>Break Length</p>
      <button id="break-increment">+</button>
      <p id="break-length">{props.breakLength}</p>
      <button id="break-decrement">-</button>
    </div>
  )
}

function SessionButtonGroup(props) {
  return (
    <div id="session-label" class="button-group">
      <p>Session Length</p>
      <button id="session-increment">+</button>
      <p id="session-length">{props.sessionLength}</p>
      <button id="session-decrement">-</button>
    </div>
  )
}

export default App;
