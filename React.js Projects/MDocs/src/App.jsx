import React from 'react'
import './components/Background'
import Background from './components/Background'
import Foreground from './components/Foreground'

function App() {
  return (
    <div className='relative w-full h-screen'>
      <Background/>
      <Foreground/>
    </div>
  )
}

export default App
