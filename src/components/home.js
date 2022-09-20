import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";



function Home() {
  var token = localStorage.getItem('token');
 
  console.log(token);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(token==""){
      navigate("/");
    }
  }, [])
  
  return (
    <body className="container">

      <div classNameName="columns  is-centered is-vcentered is-mobile">
        <div className="column is-narrow has-text-centered">
          <h1 style={{ color: "Black", fontSize: "20px" }}>Halo, Sekertariat Gereja!</h1>
        </div>
      </div>

      <div className="columns is-centered is-vcentered is-mobile">
        <div className="column is-narrow has-text-centered">
          <button onClick={()=>navigate.call(window.location.href=`/kegiatanumum`)}  id='start' className="button is-link">Daftar Kegiatan Umum</button>
        </div>
      </div>

     

    </body>

)
}

export default Home