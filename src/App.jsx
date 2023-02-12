import { useState } from 'react'
import './App.css'
//mis componentes
import ReclamosBox from './components/ReclamosBox'
import Home from './components/Home'
import ReclamoHechoBox from './components/ReclamoHechoBox'
import Navbar from './components/Navbar'
import { AnimatePresence } from 'framer-motion'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {


  return (
    <div >
        <Router>
          {/* Navbar por fuera de Routes para que quede fijo siempre */}
        <Navbar />
        <AnimatePresence mode='wait'>
        <div className='App'>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/hacer_reclamos" element={<ReclamosBox />}/>
            <Route path="/ver_reclamos" element={<ReclamoHechoBox />}/>
          </Routes>
          </div>
          </AnimatePresence>
        </Router>

    </div>
  )
}

export default App
