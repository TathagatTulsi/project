import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Add_get_Organization() {
    const [list, setList] = useState([])

    const get_Organization = async () => {
        const result = await axios.get(`http://localhost:3500/getOrganization`)
        setList(result.data.organDetait)
    }

    useEffect(() => {
        get_Organization();
    }, []);

    const search_Organization = async (e) => {
        const input = e.target.value
        const result = await axios.get(`http://localhost:3500/searchOrganization`, {
            params: {
                name: input
            }
        })
        setList(result.data.data)
    }

    const status_Organization = async (isChecked, _id) => {

        const status = isChecked ? "activate" : "deactivate";
        try {

            const result = await axios.patch(`http://localhost:3500/organizationStatus`, {
                status,
                _id
            })

            if (result.status === 200) {
                toast.success(result.data.msg);
                get_Organization();
            }

        } catch (error) {
            console.log(error)
        }
    }

    const delete_Organization = async (dataObj) => {
        const result = await axios.delete(`http://localhost:3500/deleteOrganization?_id=${dataObj._id}`)
        setList(result.data)
        toast.success(result.data.msg)
    }

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4"> Organization</h4>
            </div>

            <div>
                <div>
                    <div className="container">
                        <div className="row height d-flex justify-content-center align-items-center">
                            <div className="col-md-6">
                                <div className="form">
                                    <i className="fa fa-search"></i>
                                    <input
                                        type="text"
                                        className="form-control form-input"
                                        placeholder="Search anything..."
                                        onChange={search_Organization}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">UserName</th>
                                <th scope="col">UserEmail</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {list.length > 0 ? list.map((dataObj, index) => {
                                return (
                                    <tr key={dataObj._id}>
                                        <td>{index + 1}</td>
                                        <td><span className="text-primary">{dataObj.name}</span></td>
                                        <td><span className="text-primary">{dataObj.email}</span></td>


                                        <td><span className="text-primary">
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={dataObj.isActive}
                                                    onChange={(e) => status_Organization(e.target.checked, dataObj._id)}
                                                />
                                                <label className="form-check-label">
                                                    {dataObj.isActive ? "Active" : "Deactive"}
                                                </label>
                                            </div>
                                        </span>
                                        </td>

                                        <td>
                                            <button type="submit" className="btn btn-primary">Update</button> &nbsp;
                                            <button
                                                type="submit"
                                                className="btn btn-danger"
                                                onClick={() => delete_Organization(dataObj)}>
                                                Delete
                                            </button>{" "}
                                            &nbsp;
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <img
                                    style={{
                                        height: "41.5vh",
                                        width: "40%",
                                        marginLeft: "45%",
                                    }}
                                    src="https://w7.pngwing.com/pngs/432/660/png-transparent-empty-cart-illustration.png"
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Add_get_Organization