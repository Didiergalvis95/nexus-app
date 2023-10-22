import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { RightSide } from './components/RightSide/RightSide'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      <div className="AppGlass">
        <Dashboard/>
        <RightSide/>
      </div>
    </div>
    </>
  )
}

export default App
