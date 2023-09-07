import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import tokenDecode from '../token/tokenDecode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminNavbar = () => {
    const AdminUser = tokenDecode()

    const navigate = useNavigate();

    const [isDrpdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDrpdownOpen);
    }

    const Logout = async () => {
        localStorage.clear()
        navigate("/admin-login")
        toast.success('Logout Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <nav class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light">
            <div class="navbar-wrapper">
                <div class="navbar-container content">
                    <div class="collapse navbar-collapse show" id="navbar-mobile">
                        <ul class="nav navbar-nav mr-auto float-left">
                            <li class="nav-item d-block d-md-none">
                                <a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ft-menu"></i>
                                </a>
                            </li>
                            <li class="nav-item d-none d-md-block">
                                <a class="nav-link nav-link-expand" href="#"><i class="ficon ft-maximize"></i>
                                </a>
                            </li>

                            <li class="nav-item dropdown navbar-search">
                                <a class="nav-link dropdown-toggle hide" data-toggle="dropdown" href="#"><i class="ficon ft-search"></i>
                                </a>
                                <ul class="dropdown-menu">
                                    <li class="arrow_box">
                                        <form>
                                            <div class="input-group search-box">
                                                <div class="position-relative has-icon-right full-width">
                                                    <input class="form-control" id="search" type="text" placeholder="Search here..." />
                                                    <div class="form-control-position navbar-search-close"><i class="ft-x">   </i></div>
                                                </div>
                                            </div>
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <ul class="nav navbar-nav float-right">

                            <li class={`nav-item navbar-dropdown dropdown-user dropdown ${isDrpdownOpen ? 'show' : ''}`}>
                                <a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown" onClick={toggleDropdown}>             <span class="avatar avatar-online">
                                    <img src="theme-assets/images/portrait/small/avatar-s-19.png" alt="avatar" /><i></i></span></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <div class="arrow_box_right"><a class="dropdown-item" href="#"><span class="avatar avatar-online">
                                        <img src="theme-assets/images/portrait/small/avatar-s-19.png" alt="avatar" />
                                        <span class="user-name text-bold-700 ml-1">{AdminUser.token.userName}</span></span></a>

                                        <div class="dropdown-divider"></div>
                                        <button onClick={Logout} class="dropdown-item">
                                            <i class="ft-power"></i> Logout</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default AdminNavbar

 // <nav className="navbar navbar-expand-lg navbar-light bg-light" role="navigation" aria-label="main navigation">
//     <div className="container">
//         <a className="navbar-brand" href="/dashboard">
//             <img width="30" height="30" class="d-inline-block align-top" alt="a"/>
//         </a>

//         <div className="collapse navbar-collapse" id="navbarBasicExample">
//             <ul className="navbar-nav mr-auto">
//                 <li className="nav-item">
//                     <a className="nav-link btn btn-dark" href="/changepassword">Change Password</a>
//                 </li>
//             </ul>

//             <ul className="navbar-nav">
//                 <li className="nav-item">
//                     {/* <h4 className="nav-link mr-4">{user.userName}</h4> */}
//                 </li>
//                 <li className="nav-item">
//                     <button onClick={Logout} className="btn btn-outline-success my-2 my-sm-0">
//                         Log Out
//                     </button>
//                 </li>
//             </ul>
//         </div>
//     </div>
// </nav>