import React from 'react'
import {useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate,useParams} from 'react-router-dom';

const AddKegiatan = () => {
    const [namaKegiatan, setNamaKegiatan]=useState('');
    const [lokasi, setLokasi]=useState('');
    const [tanggal, setTanggal]=useState('');
    const [jenis, setJenisKegiatan]=useState('');
    const [tema, setTema]=useState('');
    const [deskripsi, setDeskripsi]=useState('');
    const [tamu, setTamu]=useState('');
    const [kapasitas, setKapasitas]=useState('');
    var category=["Retret","Rekoleksi","Pendalaman Kitab Suci"]
    const nav=useNavigate();
    const {id}=useParams();

    const AddKegiatan = async (e)=>{
        const devEnv = process.env.NODE_ENV !== "production";
        const {REACT_APP_DEV_URL, REACT_APP_PROD_URL} = process.env;
    
        e.preventDefault();
        await axios.post(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/addkegiatan`,{
        
            data:{
                idGereja:id,
                namaKegiatan:namaKegiatan,
                lokasi:lokasi,
                tanggal:tanggal,
                jenisKegiatan:jenis,
                temaKegiatan:tema,
                deskripsiKegiatan:deskripsi,
                tamu:tamu,
                kapasitas:kapasitas
            }
        }).then( window.location.href="/kegiatanumum");
    }

    useEffect(()=>{
     
    },[]);




  return (
    <div>
            <form onSubmit={AddKegiatan}>
                <div className='field'>
                    <label className='label'>Nama Kegiatan</label>
                    <input className="input"
                     type="text"
                     placeholder="Nama Kegiatan"
                     value={namaKegiatan}
                     onChange={(e) =>setNamaKegiatan(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Tema Kegiatan</label>
                    <input className="input"
                     type="text"
                     placeholder="Tema Kegiatan"
                     value={tema}
                     onChange={(e) =>setTema(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Deskripsi Kegiatan</label>
                    <textarea className="input"
                    
                     type="text"
                     placeholder="Deskripsi Kegiatan"
                     value={deskripsi}
                     onChange={(e) =>setDeskripsi(e.target.value)}
                     ></textarea>
                </div>
                <div className='field'>
                    <label className='label'>Jenis Kegiatan</label>
                    <select  onChange={(e) =>{setJenisKegiatan(e.target.value);}} > 
                    <option value='false' disabled selected>Jenis Kegiatan</option>
                    { 
                        category.map((category,key)=>(
                        <option value={category} >{category}</option>
                     ))}
                      
                    </select>
                </div> 
                <div className='field'>
                    <label className='label'>Tamu</label>
                    <input className="input"
                     type="text"
                     placeholder="Nama Tamu (Bisa Lebih Dari 1)"
                     value={tamu}
                     onChange={(e) =>setTamu(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Lokasi</label>
                    <input className="input" 
                    type="text"
                     placeholder="Lokasi Diadakan Kegiatan"
                     value={lokasi}
                     onChange={(e) =>setLokasi(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Tanggal</label>
                    <input className="input" 
                    type="datetime-local"
                     value={tanggal.slice(0, 19)}
                     onChange={(e) =>setTanggal(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Kapasitas</label>
                    <input className="input" 
                    type="number"
                     placeholder="Kapasitas Kegiatan"
                     value={kapasitas}
                     onChange={(e) =>setKapasitas(e.target.value)}
                     ></input>
                </div>
              

               
             

                <div className='field'>
                        <button className='button is-primary'>Update</button>
                 </div>
            </form>
          
    </div>
    
  )
}

export default AddKegiatan