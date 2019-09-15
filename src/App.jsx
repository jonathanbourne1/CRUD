import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';


import AgregarProducto from './Components/AgregarProducto';
import EditarProducto from './Components/EditarProducto';
import Productos from './Components/Productos';


function App(){
//extraer los productos de la API
const [productos,setProductos]= useState([]);
const [recargarProducto,setRecargarProducto]=useState(true)

useEffect(()=>{
const consultarAPI= async()=>{
 if(recargarProducto){
    //consultarAPI de json-server
  const resultado = await axios.get('http://localhost:4000/restaurant');
  
  setProductos(resultado.data)
 
 }
}
consultarAPI(); 
setRecargarProducto(false)

},[recargarProducto])

  return(
    <Router>
      <Header/>
      <main className="container mt-5">
      <Switch>
      <Route exact path="/productos" 
            render={()=>(
              <Productos
              productos={productos}
              />
            )}/>

      <Route exact path="/agregarProducto" render={()=>(
      <AgregarProducto
      setRecargarProducto={setRecargarProducto}
      />
      
      )} />
      
      <Route exact path="/productos/editar/:id" 
      render={(props)=>{
        
        //tomar el id del producto
        const idProducto = parseInt(props.match.params.id)
        //el producto que se pasa al state
        const producto = productos.filter(producto=>producto.id===idProducto)
        
        return( <EditarProducto
          producto={producto[0]}
        
          />)
          

      }}/>
   
      </Switch>
      </main>
    </Router>
    );
}
export default App;
