import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
 
import Header from './Components/Header';


import AgregarProducto from './Components/AgregarProducto';
import EditarProducto from './Components/EditarProducto';
import Productos from './Components/Productos';


function App(){

  return(
    <Router>
      <Header/>
      <main className="container mt-5">
      <Switch>
      <Route exact path="/agregarProducto" component={AgregarProducto}/>
      <Route exact path="/productos" component={Productos}/>
      <Route exact path="/productos/editar/:id" component={EditarProducto}/>
    
      </Switch>
      </main>
    </Router>
    );
}
export default App;
