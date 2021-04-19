import React from 'react'
import {Link} from 'react-router-dom'
function Cerveza() {
    return (
        <div className="row mt-5 m-5 mx-auto  col-xs-12 " style={{width: 600}}>
            <div className="d-grid gap-2 col-6 mx-auto">
                <Link to='/AgregarCerveza' className='btn btn-primary'>Agregar Cerveza</Link>
                <Link to='/QuitarCerveza' className='btn btn-danger mt-3'>Quitar Cerveza</Link>
            </div>
        </div>
    )
}

export default Cerveza
