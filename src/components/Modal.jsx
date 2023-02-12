import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const backdrop = {
    visible: { opacity: 1},
    hidden: { opacity: 0}
}

const modal = {
    hidden: {
        y: "-110vh",
        opacity: 0
    },
    visible: {
        y: "20px",
        opacity: 1,
        transition: {delay: 0.5}
    }
}


const Modal = ({ showModal, setShowModal }) => {
    return (
        <AnimatePresence mode='wait' >
            { showModal && (
                <motion.div className='backdrop'
                variants={backdrop}
                initial="hidden"
                animate="visible" 
                exit="hidden"
                >
                    <motion.div className='modal'
                     variants={modal} onClick={()=> setShowModal(false)}
                     >
                    
                        <h2 style={{paddingBottom: '30px'}}>Reclamo realizado</h2>
                     <Link to="/hacer_reclamos" style={{ textDecoration: 'none'}}>
                       <Button variant="outlined" style={{color: "black", marginBottom: '20px'}}>Hacer otro reclamo
                       </Button>
                    </Link>
                    <Link to="/" style={{ textDecoration: 'none'}}>
                       <Button variant="outlined" style={{color: "black", marginBottom: '20px'}}>Volver a Home
                       </Button>
                    </Link>
                    </motion.div>
                </motion.div>
               
            )}
        </AnimatePresence>
    )
}

export default Modal;