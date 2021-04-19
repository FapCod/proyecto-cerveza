import React,{useState,useEffect} from 'react'
import {DBstore} from '../firebaseConfig'
function Inicio() {
    const style = {
        width: '288px'
      };

    const [cerveza,setCerverza] =useState([])
    const getCerveza = async ()=>{ 
        try {
            const {docs} = await DBstore.collection('cerveza').get()
            const arrayCerveza = docs.map(item=>({id:item.id,...item.data()}))
            setCerverza(arrayCerveza)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getCerveza()
    },[])

    
    return (
        <div>
            <div className="row justify-content-center h-100">
                <div className="card text-white bg-primary mb-3 " style={style}>
                    <div className="card-header">Cervezas en Stock</div>
                        <div className="card-body">
                            <h5 className=" text-center card-title">TOTAL</h5>
                            {
                                 cerveza.length !==0 ?
                                 (
                                    cerveza.map(item =>    
                                        <p key={item.id} className="display-4 card-text text-center">{item.stock} </p>
                                    )
                                 )
                                 :
                                 (<div></div> )
                            }
                            
                        </div>
                </div>
            </div>
            <div className="row justify-content-center h-100">
                <div className="card text-white bg-danger mb-3" style={style}>
                    <div className="card-header">Cervezas Vendidas</div>
                        <div className="card-body">
                            <h5 className=" text-center card-title">TOTAL</h5>
                            {
                                 cerveza.length !==0 ?
                                 (
                                    cerveza.map(item =>    
                                    <p key={item.id} className="display-4 card-text text-center">{item.stock}</p>
                                    )
                                 )
                                 :
                                 (<div></div> )
                            }
                            
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Inicio
