import React from 'react'
import { Link } from 'react-router-dom'
import CardsHome from './CardsHome'

function Home() {
  return (
    <div className='App'>
      {/* Cards con link para cambiar la ruta y que el router renderice el componente que corresponde */}
        <Link style= {{textDecoration: 'none'}} to="/hacer_reclamos">
            <CardsHome
            titulo='Hacer reclamos' />
        </Link>
        <Link style= {{textDecoration: 'none'}} to="/ver_reclamos">
            <CardsHome
            titulo='Ver reclamos' />
        </Link>
      
    </div>
  )
}

export default Home