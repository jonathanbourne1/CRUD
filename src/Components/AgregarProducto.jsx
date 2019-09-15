import React,{useState} from 'react';
import Error from './Errror'
import axios from 'axios'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom';


function AgregarProducto({history,setRecargarProducto}){

     const [nombrePlatillo,setNombrePlatillo]=useState('');
     const [precioPlatillo,setPrecioPlatillo]=useState('');
     const [categoria,setCategoria]=useState('');
     const [error,setError]=useState(false);
//radio button
     const leerValorRadio=e=>{
          setCategoria(e.target.value)
     }



     //validacion
     const addProduct= async (e)=>{
          e.preventDefault()
               if(nombrePlatillo===''||precioPlatillo===''||categoria===''){
                    setError(true);
                    return;
               }
          setError(false)
          //creacion del nuevo producto
     try {
       const resultado  = await axios.post('http://localhost:4000/restaurant',
       {nombrePlatillo:nombrePlatillo,
           precioPlatillo:precioPlatillo,
           categoria:categoria 
     })
     console.log(resultado);
     if(resultado.status===201){
          Swal.fire(
               'Producto Creado ',
               'Producto Creado Correctamente',
               'success'
             )  
     }
     } catch (error) {
          console.log(error);
          
          Swal.fire({
            type: 'error',
            title: 'Algo Ocurrio ',
            text: 'Revisa la conexion a Base de datos o a internet e intenta nuevamente',
           
          })
          
     }
     //cambiar el useEffect a true para actualizar los productos
     setRecargarProducto(true)
     //redirigir al usuario a productos
     history.push('/productos')
     }
   

     


     return(

         
          <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
         {(error)? <Error mensaje='Todos los campos son obligatorios'/> : null }
            <form
            onSubmit={addProduct}
                className="mt-5"
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        onChange={e=>setNombrePlatillo(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={e=>setPrecioPlatillo(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
     )
}
export default withRouter(AgregarProducto) ;