import React,{useState,useRef} from 'react';
import Error from './Errror'
import axios from 'axios'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom';


function EditarProducto(props){
     //destructuring de props
     const {history,setRecargarProducto,producto}= props

     //generar los Refs
    const precioPlatilloRef = useRef('');
    const nombrePlatilloRef= useRef('');


     const [categoria,setCategoria]=useState('');
     const [errorEdit,setErrorEdit]=useState(false);
//radio button
     const leerValorRadio=e=>{
          setCategoria(e.target.value)
     }



     //validacion
     const editProduct= async (e)=>{
          e.preventDefault()
          const nuevoNombrePlatillo = nombrePlatilloRef.current.value;
          const nuevoPrecioPlatillo = precioPlatilloRef.current.value;
          //revisar si cambio la categoria de lo contrario asignar el mismo valor
          let categoriaPlatillo=(categoria==='')? producto.categoria:categoria;


          if(nuevoNombrePlatillo===''||nuevoPrecioPlatillo===''||categoriaPlatillo===''){
               setErrorEdit(true)
               console.log('falta algo');
               console.log(nuevoNombrePlatillo);
               console.log(nuevoPrecioPlatillo);
               console.log(categoriaPlatillo);
               return;
          }
          console.log('todobien');
          console.log(nuevoNombrePlatillo);
               console.log(nuevoPrecioPlatillo);
               console.log(categoriaPlatillo);

          
          //OBTENER VALORES DEL FORMULARIO
          const editarPlatillo ={
               nombrePlatillo : nombrePlatilloRef.current.value,
               precioPlatillo: precioPlatilloRef.current.value,
               categoria: categoriaPlatillo
          }
          
       const url =`http://localhost:4000/restaurant/${producto.id}` 
       
       try {
            const resultado = await axios.put(url,editarPlatillo);
            if(resultado.status===200){
               Swal.fire(
                    'Producto Editado ',
                    'Producto Editado Correctamente',
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

       setRecargarProducto(true)
       history.push('/productos');
 }
   

     


     return( 
          <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
         {(errorEdit)? <Error mensaje='Todos los campos son obligatorios'/> : null }
            <form
            onSubmit={editProduct}
                className="mt-5"
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        ref={nombrePlatilloRef}
                        defaultValue={producto.nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioPlatilloRef}
                        defaultValue={producto.precioPlatillo}
                        
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
                        defaultChecked={(producto.categoria==='postre')}
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
                        defaultChecked={(producto.categoria==='bebida')}
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
                        defaultChecked={(producto.categoria==='cortes')}
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
                        defaultChecked={(producto.categoria==='ensalada')}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
     )
}
export default withRouter(EditarProducto) ;