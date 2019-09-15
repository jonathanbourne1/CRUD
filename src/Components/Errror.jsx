import React from 'react'

function Error ({mensaje}){
return(
     <p className="alert alert-danger p-3 mt-5 my-5 text-center text-uppercase font-weight-bold">
      {mensaje}    
     </p>
)
}
export default  Error