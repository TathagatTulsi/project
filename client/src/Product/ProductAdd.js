import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
// import Header from '../Header/Header';
// import jwt_decode from "jwt-decode"

function ProductAdd() {
    // const token = localStorage.getItem("token")
    // const decode = jwt_decode(token)

    const [data, setData] = useState([])
    const [dataCid, setDataCid] = useState([])
    const [dataOid, setDataOid] = useState([])

    const [productName, setName] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    const [cId, setCId] = useState('')
    const [oId, setOId] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    


    const addingProduct = async (event) => {
        event.preventDefault()
        const res = await axios.post('http://localhost:3500/addProduct',
            {
                productName: productName,
                category: category,
                brand: brand,
                price: price,
                quantity: quantity,
                customerId: cId,
                organizationId: oId
            })

        if (res.data.success === true) {
            getProduct();
            toast.success(res.data.msg)
        }
    }

    // const getProduct = async () => {
    //     const res = await axios.get(`http://localhost:3500/getProduct`)
    //     setData(res.data.productDetail)
    // }

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3500/getProduct`, {
                params: { page: currentPage, pageSize: 10 } 
            });
            setData(response.data.productDetail);
            setTotalProducts(response.data.totalCount);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalProducts / 10)) { 
            setCurrentPage(currentPage + 1);
        }
    };    


    useEffect(() => {
        getProduct();
    }, [currentPage]);

    const productDelete = async (dataObj) => {
        try {
            const res = await axios.delete(`http://localhost:3500/deleteProduct?_id=${dataObj._id}`)
            setData(res.data)
            toast.success(res.data.msg)
            getProduct()
        } catch (error) {
            console.log(error)
        }
    }

    const customerDetails = async () => {
        const res = await axios.get(`http://localhost:3500/user_get`)
        setDataCid(res.data.users)
    }
    useEffect(() => {
        customerDetails();
    }, []);

    const handleDataCid = (selectedDataCId) => {
        setCId(selectedDataCId)
    };

    const organizationDetail = async () => {
        const res = await axios.get(`http://localhost:3500/getOrganization`)
        setDataOid(res.data.organDetait)
    }

    useEffect(() => {
        organizationDetail();
    }, []);

    const handleDataOid = (selectedDataOId) => {
        setOId(selectedDataOId)
    };

    const productSearch = async (e) => {
        const valueInput = (e.target.value)

        if (valueInput) {
            const value = data.filter(item =>
                (item.productName).toLowerCase().includes(valueInput.toLowerCase()))
            setData(value)
        }
        else {
            getProduct().then((res) => {
                setData(res.data.productDetail)
            }).catch((err) => { console.log(err); })
        }
    }


    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4"> Add Product </h4>
                <div className="row">
                    <div className="card mb-4">
                        <div className="card-body">
                            <form>
                                <div className="row">

                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="basic-default-fullname"> productName </label>
                                        <input type="text" className="form-control" name="productName" id="basic-default-fullname" placeholder="Iphone" onChange={e => setName(e.target.value)} required />
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="basic-default-company">category </label>
                                        <input type="text" className="form-control" id="basic-default-company" placeholder="Electronic" name="category" onChange={e => setCategory(e.target.value)} required />
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="basic-default-company"> brand </label>
                                        <input type="text" className="form-control" id="basic-default-company" placeholder="Apple" name="brand" onChange={e => setBrand(e.target.value)} required />
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="basic-default-company"> Product price </label>
                                        <input type="text" className="form-control" id="basic-default-company" placeholder="re 250" name="price" onChange={e => setPrice(e.target.value)} required />
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="basic-default-company"> quantity </label>
                                        <input type="text" className="form-control" id="basic-default-company" placeholder="3" name="quantity" onChange={e => setQuantity(e.target.value)} required />
                                    </div>

                                    <label className="form-label" htmlFor="basic-default-company"> Customer </label>
                                    <select onChange={(e) => handleDataCid(e.target.value)} class="form-select" aria-label="Default select example" required>
                                        <option selected>CustomerId</option>
                                        {dataCid.length > 0 &&
                                            dataCid.map(function (item) {
                                                return (
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <br /> <br />

                                    <label className="form-label" htmlFor="basic-default-company"> Organization </label>

                                    <select onChange={(e) => handleDataOid(e.target.value)} class="form-select" aria-label="Default select example" required>
                                        <option selected>OrganizationId</option>
                                        {dataOid.length > 0 &&
                                            dataOid.map(function (item) {
                                                return (
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div> <br />
                                <button type="submit" className="btn btn-primary" onClick={addingProduct}> Add </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div class="shadow-none p-3 mb-5 bg-light rounded">Total Product : {data.length}</div>

                    <div class="container">
                        <div class="row height d-flex justify-content-center align-items-center">
                            <div class="col-md-6">
                                <div class="form" >
                                    <i class="fa fa-search"></i>
                                    <input type="text" class="form-control form-input" placeholder="Search ProductName....." onChange={productSearch} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    

                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">productName</th>
                                <th scope="col">category</th>
                                <th scope="col">brand</th>
                                <th scope="col">price</th>
                                <th scope="col">quantity</th>
                                <th scope="col">customerId</th>
                                <th scope="col">organizationId</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.length > 0 ? data.map((dataObj, index) => {
                                return (

                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td><span class="text-primary">{dataObj.productName}</span></td>
                                        <td><span class="text-primary">{dataObj.category}</span></td>
                                        <td><span class="text-primary">{dataObj.brand}</span></td>
                                        <td><span class="text-primary">{dataObj.price}</span></td>
                                        <td><span class="text-primary">{dataObj.quantity}</span></td>
                                        <td><span class="text-primary">{dataObj.customerId}</span></td>
                                        <td><span class="text-primary">{dataObj.organizationId}</span></td>
                                        <td>
                                            <button type="submit" class="btn btn-primary">Update</button> &nbsp;
                                            <button type="submit" class="btn btn-danger" onClick={() => productDelete(dataObj)}>Delete</button> &nbsp;
                                        </td>
                                    </tr>
                                )

                            }) : <img style={{ height: "41.5vh", width: "40%", marginLeft: "45%" }} src="https://w7.pngwing.com/pngs/432/660/png-transparent-empty-cart-illustration.png" alt='a' />}

                        </tbody>
                    </table>
                    <p>Page {currentPage} / Total Products: {totalProducts}</p>

                    <div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><button class="page-link" onClick={handlePreviousPage}>Previous</button></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><button class="page-link" onClick={handleNextPage}>Next</button></li>
                            </ul>
                        </nav>
                    </div> 
        
                </div>
            </div>

        </div>
    )
}

export default ProductAdd