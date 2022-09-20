import React from 'react'
import {useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate,useParams} from 'react-router-dom';

const EditKegiatan = () => {
    const [namaKegiatan, setNamaKegiatan]=useState('');
    const [lokasi, setLokasi]=useState('');
    const [tanggal, setTanggal]=useState('');
    const [jenis, setJenisKegiatan]=useState('');
    const [tema, setTema]=useState('');
    const [deskripsi, setDeskripsi]=useState('');
    const [tamu, setTamu]=useState('');
    const [kapasitas, setKapasitas]=useState('');
    const nav=useNavigate();
    const {id}=useParams();

    const UpdateGereja = async (e)=>{
        const devEnv = process.env.NODE_ENV !== "production";
        const {REACT_APP_DEV_URL, REACT_APP_PROD_URL} = process.env;
    
        e.preventDefault();
        await axios.patch(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/updategereja`,{
        
            data:{
                id:id,
                namaKegiatan:namaKegiatan,
                lokasi:lokasi,
                tanggal:tanggal,
                jenis:jenis,
                tema:tema,
                deskripsi:deskripsi,
                tamu:tamu,
                kapasitas:kapasitas
            }
        }).then( window.location.href="/daftargereja");
    }

    useEffect(()=>{
        getIdUmum();
    },[]);

    const getIdUmum= async ()=>{
        console.log(id)
        const devEnv = process.env.NODE_ENV !== "production";
        const {REACT_APP_DEV_URL, REACT_APP_PROD_URL} = process.env;
    
        await axios.get(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/getidumum`,{
            params:{
                id:id
            }
        }).then((response)=>{
            setNamaKegiatan(response.data[0].namaKegiatan);
            setLokasi(response.data[0].lokasi);
            setTanggal(response.data[0].tanggal);
            setKapasitas(response.data[0].kapasitas);
            setTema(response.data[0].temaKegiatan);
            setDeskripsi(response.data[0].deskripsiKegiatan);
            setTamu(response.data[0].tamu);
            setJenisKegiatan(response.data[0].jenisKegiatan);
        });
        
    }

    // const getAllCategory= async()=>{
    //     const devEnv = process.env.NODE_ENV !== "production";
    //     await axios.get(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/getallcategory`).
    //     then((res)=>{
    //          console.log(res.data)
    //          if (res.data.length!=0){
    //             setCategory(res.data);
    //             }
    //     }).catch((e)=>{
    //        // window.location.reload();
    //     });
    // }

  return (
    <div>
            <form onSubmit={UpdateGereja}>
                <div className='field'>
                    <label className='label'>Nama</label>
                    <input className="input"
                     type="text"
                     placeholder="question"
                     value={namaKegiatan}
                     onChange={(e) =>setNamaKegiatan(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Address</label>
                    <input className="input" 
                    type="text"
                     placeholder="option 1"
                     value={lokasi}
                     onChange={(e) =>setLokasi(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Kapasitas</label>
                    <input className="input" 
                    type="text"
                     placeholder="option 2"
                     value={kapasitas}
                     onChange={(e) =>setKapasitas(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Paroki</label>
                    <input className="input" type="text" 
                    placeholder="option 3"
                    value={tema}
                     onChange={(e) =>setTema(e.target.value)}
                    ></input>
                </div>

                <div className='field'>
                    <label className='label'>Lingkungan</label>
                    <input className="input" 
                    type="text" 
                    placeholder="option 4"
                    value={deskripsi}
                     onChange={(e) =>setDeskripsi(e.target.value)}
                    ></input>
                </div>

                {/* <div className='field'>
                    <label className='label'>Category</label>
                    <select  onChange={(e) =>setCategory2(e.target.value)} > 
                   
                    { category.map((category,key)=>(
                        <option value={category._id} selected={(category2=== category._id) ? true : false} >{category.name}</option>
                     ))}
                      
                    </select>
                </div> */}

                <div className='field'>
                        <button className='button is-primary'>Update</button>
                 </div>
            </form>
          
    </div>
    
  )
}

export default EditKegiatan