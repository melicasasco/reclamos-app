import React, { useEffect, useState } from 'react';
import {
  query,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { db } from "../firebase";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';

function ReclamoHechoBox() {
//variable de estado de reclamos donde guardo todos los reclamos hechos que recibo desde firebase
  const [reclamos, setReclamos] = useState([]);
  
  useEffect(() => {
    //consulta a mi collection reclamos de firebase
    const q = query(collection(db, 'reclamos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //guardo en un array los objetos que recibo de firebase junto con el id y actualizo la variable de estado reclamos
      let reclamosArr = [];
      querySnapshot.forEach((doc) => {
        reclamosArr.push({ ...doc.data(), id: doc.id });
      });
      setReclamos(reclamosArr);
    });
    return () => unsubscribe();
  }, []);

  //esto es para material ui table
  const defaultMaterialTheme = createTheme();

  //defino columnas para mi tabla
  const columnas = [
    {
      titulo: 'Titulo',
      field: 'titulo'
    },
    {
      titulo: 'Descripcion',
      field: 'descripcion'
    },
    {
      titulo: 'Comuna',
      field: 'comuna'
    },
    {
      titulo: 'Imagen',
      field:'imagen',
      render:rowData=><a href={rowData.imagen} target="_blank" style={{textDecoration: 'none', color: '#222'}}>Ver imagen</a>
    }
  ]
 

  return (
    <div style={{marginTop: '10rem', width: '80vw',}}>
      { reclamos.length === 0 ? (
        <h1 >Loading...</h1>
      ) : (
        <ThemeProvider theme={defaultMaterialTheme}>
        
          <MaterialTable style={{ width: '100%', margin: '0 auto'}}
          title="Mis reclamos"
         columns={columnas}
         data={reclamos}
        >
        </MaterialTable>

        </ThemeProvider>
      )
     }
    </div>
  )
}

export default ReclamoHechoBox