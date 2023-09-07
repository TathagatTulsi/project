import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import tokenDecode from "../token/tokenDecode"
// import Header from '../Header/Header';
// import jwt_decode from "jwt-decode"


function AddSubscription() {

    // const header = Header()
    // const token = localStorage.getItem("token")
    // const decode = jwt_decode(token)
    // const _id = decode.token._id

    // const navigate = useNavigate();

    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const addingSusb = async (event) => {
        event.preventDefault()
        const res = await axios.post('http://localhost:3500/addSuscriber', { name, price })
        if (res.data.success === true) {
            getSubs();
            toast.success(res.data.msg)
            getSubs()
        }
    }

    const getSubs = async () => {
        const res = await axios.get(`http://localhost:3500/getSuscriber`)
        setData(res.data.subAdd)
    }

    useEffect(() => {
        getSubs();
    }, []);

    const TaskDelete = async (dataObj) => {
        try {
            const res = await axios.delete(`http://localhost:3500/deleteSuscriber?_id=${dataObj._id}`)
            setData(res.data)
            console.log("object", res.data);
            toast.success(res.data.msg)
            getSubs()
            
        } catch (error) {
            console.log(error)
        }
    }

    const updateSuscriber = async () =>{
        try {
            const result = await axios.patch(`http://loacalhost/updateSuscriber`)
            console.log("result", result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4"> Add Subscription </h4>
                <div className="row">
                    <div className="card mb-4">
                        <div className="card-body">
                            <form>
                                <div className="row">

                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="basic-default-fullname"> Name </label>
                                        <input type="text" className="form-control" name="name" id="basic-default-fullname" placeholder="Gold" onChange={e => setName(e.target.value)} required />
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="basic-default-company"> price </label>
                                        <input type="text" className="form-control" id="basic-default-company" placeholder="$250" name="price" onChange={e => setPrice(e.target.value)} required />
                                    </div>


                                </div>
                                <button type="submit" className="btn btn-primary" onClick={addingSusb}> Add </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">SubscriptionName</th>
                                <th scope="col">Price</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.length > 0 ? data.map((dataObj, index) => {
                                return (

                                    <tr>
                                        <th scope="row">{index +1}</th>
                                        <td><span class="text-primary">{dataObj.name}</span></td>
                                        <td><span class="text-primary">{dataObj.price}</span></td>
                                        <td>
                                            <button type="submit" class="btn btn-primary" onClick={updateSuscriber}>Update</button> &nbsp;
                                            <button type="submit" class="btn btn-danger" onClick={() => TaskDelete(dataObj)}>Delete</button> &nbsp;
                                        </td>
                                    </tr>
                                )

                            }) : <img style={{ height: "41.5vh", width: "40%", marginLeft: "45%" }} src="https://w7.pngwing.com/pngs/432/660/png-transparent-empty-cart-illustration.png" />}

                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
}

export default AddSubscription