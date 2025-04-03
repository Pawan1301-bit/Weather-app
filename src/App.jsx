import React from 'react'
import Navbar from './Components/Navbar'
import Weather from './Components/weather'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div className='bg-gradient-to-b from-[#14143A] to-[#3D2C5E] min-h-screen'>
        <Navbar/>
        <Weather/>
        <Footer/>
    </div>
  )
}

export default App
