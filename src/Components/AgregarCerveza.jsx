import React,{useState,useEffect } from 'react'
import { DBstore } from '../firebaseConfig'
function AgregarCerveza() {
    const [id,setId] = useState('')
    const [cantidadCaja, setCantidadCaja] = useState(0)
    const [cantidadUni, setCantidadUni] = useState(0)
    const [error, setError] = useState(null)
    const [cerveza, setCerveza]= useState('')
    const [modoEdicion,setModoEdicion] = useState(false)

    const limpiarDatos = () => {
        setCantidadCaja('')
        setCantidadUni('')
        setId('')
        setModoEdicion(false)
    }

    //funcion1
    const agregarCervezaPorCaja = async (e) => {
        e.preventDefault()
        if (isNaN(cantidadCaja)===true) {
            setError("Complete los campos vacios")
        } else {
            setError(null)
            let valorEnviarCantidad= cantidadCaja *12
            const cerveza = {
                stock: valorEnviarCantidad
            }
            try {
                const data = await DBstore.collection('cerveza').add(cerveza)
                alert("Cerveza Agregada")
                getCerveza()
                limpiarDatos()
            } catch (error) {
                console.error(error)
            }
        }
    }
    //fin funcion1
    //funcion2
    const agregarCervezaPorUni = async (e) => {
        e.preventDefault()
        if (isNaN(cantidadCaja)===true) {
            setError("Complete los campos vacios")
        } else {
            setError(null)
            const cerveza = {
                stock: cantidadUni
            }
            try {
                const data = await DBstore.collection('cerveza').add(cerveza)
                alert("Cerveza Agregada")
                getCerveza()
                limpiarDatos()
            } catch (error) {
                console.error(error)
            }
        }
    }
    //fin funcion2

    //obtener Cerverza
    const getCerveza = async ()=>{ 
        try {
            const {docs} = await DBstore.collection('cerveza').get()
            const arrayCerveza= docs.map(item=>({id:item.id,...item.data()}))
            setCerveza(arrayCerveza)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCerveza()
    },[])
    //fin obtener cerveza
    //funcion editarCaja
    const editarCaja = async (id)=>{
        setModoEdicion(true)
        try {
            const data = await DBstore.collection('cerveza').doc(id).get()
            setCantidadCaja(data.data().stock/12)
            setId(id)
        } catch (error) {
            console.error(error)
        }
    }
    //fin funcion editarCaja

    //funcion editarUnidad
    const editarUnidad = async (id)=>{
        setModoEdicion(true)
        try {
            const data = await DBstore.collection('cerveza').doc(id).get()
            setCantidadUni(data.data().stock)
            let valorcaja= cantidadUni/12
            setCantidadCaja(valorcaja)
            setId(id)
        } catch (error) {
            console.error(error)
        }
    }
    //fin funcion editarUnidad


    //editar Cerveza caja
    const editarCervezaCaja = async (e)=>{
        e.preventDefault()
        if (isNaN(cantidadCaja)===true) {
            setError("Complete los campos vacios")
        } else {
            setError(null)
            let valorEnviarCantidad =cantidadCaja*12
            const cervezaActual = {
                stock: valorEnviarCantidad
            }
            try {
                await DBstore.collection('cerveza').doc(id).set(cervezaActual)
                alert("Cerveza Actualizado")
                getCerveza()
            } catch (error) {
                console.error(error)
            }
            limpiarDatos()
        }
    }
    //fin editar Cerveza`caja
    //editar Cerveza Unidade
    const editarCervezaUni = async (e)=>{
        e.preventDefault()
        if (isNaN(cantidadUni)===true) {
            setError("Complete los campos vacios")
        } else {
            setError(null)
            const cervezaActual = {
                stock: cantidadUni
            }
            try {
                await DBstore.collection('cerveza').doc(id).set(cervezaActual)
                alert("Cerveza Actualizado")
                getCerveza()
            } catch (error) {
                console.error(error)
            }
            limpiarDatos()
        }
    }

    //fin editar cerveza unidad

    return (
    <div className="row mt-5  mx-auto  " style={{width: 600}}>
        <form onSubmit={(e)=>{modoEdicion ? editarCervezaCaja(e) : agregarCervezaPorCaja(e)}}>
            <div>
            <div className="mb-3">
                <label  className="form-label ">Agregar por Cajas</label>
                <input  onChange={(e) => { setCantidadCaja(e.target.value) }}  type="number" className="form-control" value={cantidadCaja}  placeholder="0"/>
            </div>
                    {
                        modoEdicion ?
                        (<button type="submit" className="btn btn-primary ">Editar Caja</button>)
                        :
                        (<button type="submit" className="btn btn-primary "> Agregar Caja</button>)
                    }
            </div>
                    {
                        error !== null ?
                        (<div className="alert alert-danger" role="alert">{error}</div>)
                        :
                        (<div></div>)
                    }
        </form>
                
        {/*  */}


        <form onSubmit={(e)=>{modoEdicion ? editarCervezaUni(e) : agregarCervezaPorUni(e)}}>
            <div className="ml-3">
            <div className="mb-3">
                <label    className="form-label">Agregar por Unidades</label>
                <input onChange={(e) => { setCantidadUni(e.target.value) }} type="number" className="form-control"  placeholder="0" value={cantidadUni}/>
            </div>
                    {
                        modoEdicion ?
                        (<button type="submit" className="btn btn-primary ">Editar Unidad</button>)
                        :
                        (<button type="submit" className="btn btn-primary ">Agregar Unidad</button>)
                    }
           
            </div>
                    {
                        error !== null ?
                        (<div className="alert alert-danger" role="alert">{error}</div>)
                        :
                        (<div></div>)
                    }
        </form>



        {/*  */}

        <div className="col">
                    <h2 className="text-center">Cerveza</h2>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Cantidad</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                cerveza.length !==0 ?
                                (
                                            cerveza.map(item =>
                                                <tr key={item.id}>
                                                    <th scope="row">{item.stock} </th>
                                                    <td> <button className="btn btn-success" onClick={()=>{editarCaja(item.id)}} >Editar Caja</button></td>
                                                    <td> <button className="btn btn-primary" onClick={()=>{editarUnidad(item.id)}} >Editar Unidad</button></td>
                                                </tr>

                                            )
                                )
                                :
                                (
                                    <div className='alert alert-danger' role='alert'>No hay registro</div>
                                )
                            }

                        </tbody>
                    </table>
                </div>
    </div>
    )
}
    
export default AgregarCerveza
