import React, { useEffect, useState } from 'react';
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage"
import Modal from './Modal';

function ReclamosBox() {

  //estado que controla la aparicion o desaparicion del modal
  const [showModal, setShowModal] = useState(false);
  //estados que manejan el valor de los campos del reclamo en el formulario
  const [title, setTitle] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [comuna, setComuna] = useState('')
  const [imagenUrl, setImagenUrl] = useState('');
  // estado que guarda valor de la carga de la imagen adjunta a storage
  const [progress, setProgress] = useState(0)


  //funcion para subir la imagen que carga el usuario a firebase storage
  const onHandleImagenChange = (e) => {
    let aux_imagen = imagenUrl;
    // guardo en mi variable auxiliar la imagen cargada
    aux_imagen = e.target.files[0];
    //creo la ruta en firebase storage donde cargo imagen
    const storageRef = ref(storage, `/imagenes/${aux_imagen.name}`)
    //creo tarea para que se suba la imagen a la ruta definida anteriormente
    const uploadTask = uploadBytesResumable(storageRef, aux_imagen)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //tomo el estado actual de la carga y calculo porcentaje subido, lo almaceno en variable prog(redondeado)
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //actualizo variable de estado progress con el valor actual almacenado en prog
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        //obtengo la url ala imagen subida y la actualizo en mi variable estado imagenUrl
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => setImagenUrl(url))
      }
    )
  }
  //

  //funcion p subir un reclamo a firebase
 const addOrEdit = async (reclamo) => {
    await addDoc(collection(db, "reclamos"), reclamo);      
  };

  const Clear = () => {
    setTitle('');
    setDescripcion('')
    setComuna('');
    setImagenUrl('');

  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    // creo el reclamo a subir a firebase
    let reclamo = {
      titulo: title,
      descripcion: descripcion,
      comuna: comuna,
      imagen: imagenUrl

    };
    //1. llamo a esta funcion objeto que se crea al hacer el submit
    addOrEdit(reclamo); 
    //llamo a esta funcoin para setear mis variables de estado en vacio
    Clear();
    setShowModal(true);
  };



  return (
    <>
    <div className='reclamos-container'>
    {showModal === true ? 
    (<Modal showModal={showModal} setShowModal={setShowModal}></Modal>) : 
    (<form onSubmit={onHandleSubmit} className='form'>
            <label>
                Título/Motivo de mi reclamo: <br></br>
                <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required />
            </label>
            <br></br>
            <label>
                Descripción: <br></br>
                <input 
                type="text" 
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required />
            </label>
            <br></br>
            <label>
                Seleccionar Comuna: <br></br>
                <select
                 value={comuna}
                 defaultValue={'Elegir'}
                 onChange={(e) => setComuna(e.target.value)}
                 >
                    <option
                    value="Elegir">Elegir</option>
                    <option value="comuna1">Comuna 1</option>
                    <option value="comuna2">Comuna 2 </option>
                    <option value="comuna3">Comuna 3</option>
                    <option value="comuna3">Comuna 4</option>
                    <option value="comuna3">Comuna 5</option>
                    <option value="comuna3">Comuna 6</option>
                </select>
            </label>
            <label>
            <input
            className='inputImagen'
              type="file"
              onChange={onHandleImagenChange}
            />
            </label>
            <br></br>
            {/* renderizo condicionalmente el btn de submit para que solo me aparezca una vez que la img se termino de subir */}
            { imagenUrl === '' ?
            (<p>subir imagen para confirmar: {progress}% </p>) : (
              <input className='btn' type="submit" value="Submit"/>
            )}
          
        
        </form>)}
    
        
        
    </div>
    </>
  )
}

export default ReclamosBox