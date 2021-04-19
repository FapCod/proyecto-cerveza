import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../firebaseConfig'
import {useHistory} from 'react-router-dom'
function Login() {
    const history= useHistory()
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [msgError,setMsgError]= useState(null)
    const VerificarUsuario=(e)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password).then(()=>
        {
            history.push("/")
            //LimpiarDatos()
    
        }).catch(e=>{
            console.error(e)
            if(e.code ==='auth/user-not-found' || e.code ==='auth/wrong-password'){
                setMsgError('Credenciales incorrectos')
            }
        })
        
    }

    return (
        <div className="row mt-5 m-5 mx-auto  col-xs-12 " style={{width: 600}}>
                
            <div className="container login-container">
            <h2 className="text-center ">Login</h2>
                <form onSubmit={(e)=>{VerificarUsuario(e)}}  form="form-group">
                    <div className="mb-3">
                        <label  className="form-label">Correo Electronico</label>
                        <input value={email} onChange={(e) =>{setEmail(e.target.value)}}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input onChange={(e) =>{setPassword(e.target.value)}} value={password}  type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                
                    <button type="submit" className="center-block btn btn-dark">Ingresar</button> <br/>
                    <label className="">No tienes cuenta? <Link to="/Registrar">Crear Cuenta</Link> </label>
                </form>
                {
                    msgError !=null ? 
                    ( <div className="alert alert-danger" role="alert">
                { msgError }
                </div> )
                    :
                    ( <div></div> )
                }
            </div>
    </div>
    )
}

export default Login
