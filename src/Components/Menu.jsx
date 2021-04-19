import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {auth} from '../firebaseConfig'

function Menu() {
    const history = useHistory()
    const [estado,setEstado]=useState(null)
    const [user,setUser]=useState(null)
    useEffect(() =>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setEstado(user.email)
                setUser(user)
                console.log(user.email)
            }
        })
    },[])//se pone un array vacio para que no se genere un loop infinito sino estara buscando a cada rato
    const CerrarSession=() =>{
        auth.signOut()
        setEstado(null)
        setUser(null)
        history.push("/Login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Cerveceria</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        { 
                            user !== null ?
                          
                            ( <Link to='/' className="nav-link active">Home</Link>
                            )
                            :
                            ( <div></div> )
                            }
                        
                       
                        </li>
                        <li className="nav-item">
                        { 
                            !estado ?
                            (<Link to="/Login" className="nav-link active" >Login</Link>
                            )
                            :
                            ( <div></div> )
                            }
                        </li>
                        <li className="nav-item">
                            { 
                            !estado ?
                            (<Link to="/Registrar" className="nav-link active" >Registrar</Link>
                            )
                            :
                            ( <div></div> )
                            }
                       
                        </li>
                        <li className="nav-item">
                        { 
                            user !== null ?
                          
                            (<Link to='/Cerveza' className="nav-link active" >Cerveza</Link>
                            )
                            :
                            ( <div></div> )
                            }
                        
                        </li>
                    </ul>
                    </div>
                    { 
                        estado ?
                        (
                        <form >
                        <button onClick={CerrarSession} className="btn btn-outline-danger ">Salir</button>
                        </form>
                           )
                        :
                        ( <div></div> )
                }
                </div>
            </nav>
            
        </div>
    )
}

export default Menu
