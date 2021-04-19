import React,{useState}  from 'react'
import {Link,useHistory} from 'react-router-dom'
import {auth} from '../firebaseConfig'
function Registrar() {
    const history= useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [terminos,setTerminos] = useState(false)
    const [msgError,setMsgError]= useState(null)
    const [bandera,setBandera]= useState(0)
    //Funcion
    const RegistrarUsuario=(e)=>{
        e.preventDefault()
        if(terminos === false){
            setMsgError('Acepte terminos y condiciones')
        }else{
                auth.createUserWithEmailAndPassword(email,password).then((res)=>{
                    setBandera(1)
                    setTimeout(()=>{
                        history.push("/")
                    },2000)
                
                })
                .catch (error=> {
                    if(error.code ==='auth/invalid-email'){
                        setMsgError('Email incorrecto')
                    }else if(error.code ==='auth/weak-password'){
                        setMsgError('La contrasena debe ser mas de 6 digitos ')
                    }
                })
            
        }
    }
    return (
        <div className="row mt-5 m-5 mx-auto  col-xs-12 " style={{width: 600}}>
            
                    <div className="container login-container">
                    <h2 className="text-center ">Registrar</h2>
                        <form onSubmit={(e)=>{RegistrarUsuario(e)}} form="form-group">
                            <div className="mb-3">
                                <label className="form-label">Correo Electronico</label>
                                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Password</label>
                                <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 form-check">
                                <input checked={terminos} onChange={(e)=>{setTerminos(e.target.checked)}} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" >Terminos y Condiciones</label>
                            </div>
                            <button type="submit" className="center-block btn btn-dark">Registrarse</button> <br/>
                            <label className="">Ya tienes cuenta? <Link to="/Login">Inicia Session</Link> </label>
                        </form>
                        {
                            msgError !=null ? 
                            ( <div className="alert alert-danger" role="alert">
                           { msgError }
                          </div> )
                            :
                            ( <div></div> )
                        }
                        {
                            bandera ===1 ? 
                            (<div className="alert alert-success" role="alert">Usuario Creado Correctamente </div>) 
                            :
                            (<div></div>)
                        }
                    </div>
        </div>
    )
}

export default Registrar
