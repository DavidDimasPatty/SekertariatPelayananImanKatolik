import React from 'react'
import { Link, useNavigate } from "react-router-dom";



function Home() {
  const navigate = useNavigate();
  return (
    <body className="container">

      <div classNameName="columns  is-centered is-vcentered is-mobile">
        <div className="column is-narrow has-text-centered">
          <h1 style={{ color: "Black", fontSize: "20px" }}>Welcome To Admin Page</h1>
        </div>
      </div>

      <div className="columns is-centered is-vcentered is-mobile">
        <div className="column is-narrow has-text-centered">
          <button onClick={()=>navigate.call(window.location.href=`/daftargereja`)}  id='start' className="button is-link">Daftar Gereja</button>
        </div>
      </div>

      <div className="columns is-centered is-vcentered is-mobile">
        <div className="column is-narrow has-text-centered">
          <button onClick={()=>navigate.call(window.location.href=`/daftaruser`)} id='scoreboard' className="button is-link">Daftar User</button>
        </div>
      </div>

    </body>

)
}

export default Home