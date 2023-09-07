import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Header from '../Header/Header';
// import jwt_decode from "jwt-decode";

function OrganizationDashboard() {
  // const token = localStorage.getItem("token");
  // const decode = jwt_decode(token);

  // const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // const getUser = async () => {
  //   const res = await axios.get(`http://localhost:3500/user_get`);
  //   setItems(res.data.user);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  const getUser = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3500/user_get?page=${page}`);
      setItem(response.data.users);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages); // Set the total number of pages
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser(currentPage);
  }, [currentPage]);

  // Add functions to handle next and previous page navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }


  const deleteUser = async (dataObj) => {
    const res = await axios.delete(`http://localhost:3500/deleteUser?_id=${dataObj._id}`);
    setItem(res.data);
  };

  const userSearch = async (e) => {
    let value = e.target.value;
    const res = await axios.get(`http://localhost:3500/searchUser`, {
      params: {
        name: value
      }
    });
    setItem(res.data.user);
  };

  // const userStatus = async (e, _id) => {
  //   const value = e.target.value;
  //   console.log("value", value);
  //   if (value !== "") {
  //     const res = await axios.patch(`http://localhost:3500/updateStatus`, {
  //       status: value,
  //       _id: _id
  //     });
  //     if (res.status === 200) {
  //       toast.success(res.data.msg)
  //       console.log("res", res)
  //       getUser();
  //     }

  //   }
  // };

  const userStatus = async (isChecked, _id) => {
    const status = isChecked ? "activate" : "deactivate";

    try {
      const res = await axios.patch(`http://localhost:3500/updateStatus`, {
        status,
        _id
      });

      if (res.status === 200) {
        toast.success(res.data.msg);
        getUser();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  return (
    <div>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4"> User Details </h4>
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
                    onChange={userSearch}
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
                <th scope='col'>Status Toggle</th>
                <th scope='col'>Action</th>

              </tr>
            </thead>
            <tbody>
              {item.length > 0 ? item.map((dataObj, index) => {
                return (
                  <tr key={dataObj._id}>
                    <td>{index + 1}</td>
                    <td><span className="text-primary">{dataObj.name}</span></td>
                    <td><span className="text-primary">{dataObj.email}</span></td>
                    <td>

                      <select
                        onChange={(e) => userStatus(e, dataObj._id)}
                        id="status"
                      >
                        {dataObj?.isActive ? (
                          <>
                            <option value="activate">Active</option>
                            <option value="deactivate">Deactivate</option>
                          </>
                        ) : (
                          <>
                            <option value="deactivate">Deactivate</option>
                            <option value="activate">Activate</option>
                          </>
                        )}
                      </select>
                    </td>

                    <td><span className="text-primary">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={dataObj.isActive}
                          onChange={(e) => userStatus(e.target.checked, dataObj._id)}
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
                        onClick={() => deleteUser(dataObj)}>
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
                 alt='a'/>
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1} className="btn btn-primary"> Previous</button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="btn btn-primary" > Next </button>
          </div>


        </div>
      </div>
    </div>
  );
}

export default OrganizationDashboard;