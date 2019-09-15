import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'

function ListaProductos({producto,setRecargarProducto}){

     const eliminarProducto= (id)=>{        
          console.log('eliminar',id)
          Swal.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               type: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
             }).then(async(result) => {
               if (result.value) {
                    try {
                         const url =(`http://localhost:4000/restaurant/${id}`)
                         const resultado= await axios.delete(url)
                  if(resultado.status===200){
                                  Swal.fire(
                         'Deleted!',
                        'Your file has been deleted.',
                      'success'
                         )
                         setRecargarProducto(true) 
                      }  
                    } catch (error) {
                         console.log(error)
                         Swal.fire({
                              type: 'error',
                              title: 'Algo Ocurrio ',
                              text: 'Revisa la conexion a Base de datos o a internet e intenta nuevamente',
                             
                            })
                    }

               }

             })
          
     }
     
     return(
          <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between align-items-center">
               <p>{producto.nombrePlatillo}{'   '}
               <span className="font-weight-bold">  $ {producto.precioPlatillo}</span>
               </p>
               <div>
               <Link
               to ={`/productos/editar/${producto.id}`}
               className="btn btn-success mr-2">Editar</Link>
               <button
               type="button"
                className="btn btn-danger"
                onClick={()=>eliminarProducto(producto.id)}
                >Eliminar &times; </button>
               </div>
          </li>
     )
     } 
export default ListaProductos;