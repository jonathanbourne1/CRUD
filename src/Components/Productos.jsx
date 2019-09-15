import React,{Fragment} from 'react';
import ListaProductos from './ListaProductos'

function Productos({productos,setRecargarProducto}){
     return(
          <Fragment>
          <h1 className="text-center"> Productos</h1>
          <ul className="list-group mt-5">
               {productos.map(producto=>(
                    <ListaProductos
                    key={producto.id}
                    producto ={producto}
                    setRecargarProducto={setRecargarProducto}
                    />
               ))}
          </ul>
          </Fragment>
     )
}
export default Productos;