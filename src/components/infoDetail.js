import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const InfoDetail = () => {
    const [gereja, setGereja] = useState([]);
    const nav = useNavigate();
    const {id}=useParams();
    useEffect(() => {
        getAllEnrollUser();
    }, [])

    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    const deleteGereja = async (id) => {
        await axios.delete(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/deletekegiatan`, {
            data: {
                id: id
            },
        }).then(window.location.href = "/kegiatanumum")
    }

    const getAllEnrollUser = async () => {
        await axios.get(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/getuserkegiatan`, {
            params: {
                id: id
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

            <Link to={"/kegiatanUmum/"} className='button is-primary mt-2 mr-3 mb-3'>Back To Kegiatan Umum</Link>
           
            <table className='table is-stripped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id User</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Tanggal Daftar</th>
                    </tr>
                </thead>
                <tbody>
                    {gereja.map((Gereja, index) => (
                        <tr key={Gereja._id}>
                            <td>{index + 1}</td>
                            <td>{Gereja._id}</td>
                            <td>{Gereja.members[0].name}</td>
                            <td>{Gereja.members[0].email}</td>
                            <td>{Gereja.tanggalDaftar}</td>
                            <td>
                               
                            <button onClick={() => deleteGereja(Gereja._id)} className='button is-small is-info' disabled>Accept</button>
                                <button onClick={() => deleteGereja(Gereja._id)} className='button is-small is-danger'>Reject</button>
                            </td>

                        </tr>

                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default InfoDetail