import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3500/loginOrganization', {
                email: email,
                password: password
            });

            if (res.data.success) {
                toast.success(res.data.msg)
                localStorage.setItem("token", res.data.token)
                navigate("/organ-dashboard")
            }
            else {
                console.log("else.res", res)
                toast.warn(res.data)
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <form onSubmit={Auth}>
            <h4>Organization Panel</h4> <br />

            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <br />

            <p className="forgot-password text-left">
                <a href="/registerOrganization">Register</a>
            </p>
            <br />

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default AdminLogin