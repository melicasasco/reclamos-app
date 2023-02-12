import React from 'react'
import logo from '/claim-logo.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
       <div 
       style={{margin: '0 auto', display: 'flex', justifyContent: 'center', top: '0', position: 'fixed', paddingBottom: '150px',
       top: '20%', paddingTop: '30px', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <Link style={{textDecoration: 'none'}} to='/'>
        <h2>App de Reclamos</h2>
          <img className="logo" src={logo} alt="App de Reclamos" height="80px" style={{marginLeft: 'auto',
          marginRight: 'auto', width: '35%', display: 'block'}}></img>
        </Link>
        </div>
    </>
  )
}

export default Navbar