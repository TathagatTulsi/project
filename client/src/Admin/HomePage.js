import React from 'react'

function HomePage() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" role="navigation" aria-label="main navigation">
            <div className="container">
            <a className="navbar-brand" href="/">
                    <img src="logo.png" width="75" height="28" alt="logo"/>
                </a>

                <div className="collapse navbar-collapse" id="navbarBasicExample">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link btn btn-dark" href="/admin-login">Admin Login</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link btn btn-dark" href="/loginOrganization">Organization Login</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link btn btn-dark" href="/User-Login">User Login</a>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    )
}

export default HomePage