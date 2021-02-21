import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div id="clock">
      <BreakButtonGroup/>
      <SessionButtonGroup/>
      <div id="clock-wrapper">
        <p id="timer-label">Session</p>
        <p id="time-left">25:00</p>
        <button id="start-stop">>||</button>
        <button idj="reset">reset</button>
      </div>
    </div>
  )
}

function BreakButtonGroup() {
  return (
    <div id="break-label" class="button-group">
      <p>Break Length</p>
      <button id="break-increment">+</button>
      <p id="break-length">5</p>
      <button id="break-decrement">-</button>
    </div>
  )
}

function SessionButtonGroup() {
  return (
    <div id="session-label" class="button-group">
      <p>Session Length</p>
      <button id="session-increment">+</button>
      <p id="session-length">25</p>
      <button id="session-decrement">-</button>
    </div>
  )
}

export default App;
