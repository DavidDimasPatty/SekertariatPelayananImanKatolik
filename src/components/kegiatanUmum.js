import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const KegiatanUmum = () => {
    const [gereja, setGereja] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        getAllGereja();
    }, [])

    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    const deleteGereja = async (id) => {
        await axios.delete(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/deletegereja`, {
            data: {
                id: id
            },
        }).then(window.location.href = "/daftargereja")
    }

    const getAllGereja = async () => {
        await axios.get(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/getumum`, {
            params: {
                id: localStorage.getItem('token')
            }
        }).
            then((res) => {
                console.log(res.data)
                if (res.data.length != 0) {
                    setGereja(res.data);
                }
            }).catch((e) => {
                window.location.reload();
            });


    }

    return (
        <div>

            <Link to="/home" className='button is-primary mt-2 mr-3 mb-3'>Back To Home</Link>
            <Link to="/pageaddgereja" className='button is-primary mt-2'>Add Gereja</Link>
            <table className='table is-stripped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id Kegiatan</th>
                        <th>Nama Kegiatan</th>
                        <th>Tema Kegiatan</th>
                        <th>Deskripsi Kegiatan</th>
                        <th>Jenis Kegiatan</th>
                        <th>Kapasitas</th>
                        <th>Lokasi</th>
                        <th>Tanggal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gereja.map((Gereja, index) => (
                        <tr key={Gereja._id}>
                            <td>{index + 1}</td>
                            <td>{Gereja._id}</td>
                            <td>{Gereja.namaKegiatan}</td>
                            <td>{Gereja.temaKegiatan}</td>
                            <td>{Gereja.deskripsiKegiatan}</td>
                            <td>{Gereja.jenisKegiatan}</td>
                            <td>{Gereja.kapasitas}</td>
                            <td>{Gereja.lokasi}</td>
                            <td>{Gereja.tanggal}</td>
                            <td>
                                <Link to={`/editgereja/${Gereja._id}`} className='button is-small is-info'>Info Detail</Link>
                                <Link to={`/editkegiatan/${Gereja._id}`} className='button is-small is-info'>Edit</Link>
                                <button onClick={() => deleteGereja(Gereja._id)} className='button is-small is-danger'>Delete</button>
                            </td>

                        </tr>

                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default KegiatanUmum
