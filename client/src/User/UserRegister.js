import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [plan, setPlan] = useState([])
    const [orgId, setSubId] = useState()
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post('http://localhost:3500/addUser', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                organizationId: orgId
            });
            console.log("res", res);

            if (res.data.success === true) {

                toast.success(res.data.msg)
                localStorage.setItem("token", res.data.token);
                navigate("/User-Login")
            }
            else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            if (error.response) {
                toast.error('Fill Details!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    }

    const getOrganization = async () => {
        const res = await axios.get("http://localhost:3500/getOrganization")
        setPlan(res.data.organDetait)
    }

    useEffect(() => {
        getOrganization()
    }, [])

    const handlePlanSubmit = (selectedPlanId) => {
        setSubId(selectedPlanId)
    };


    return (
        <div>
        <form onSubmit={Register}>
            <h4>User Register Panel</h4> <br />

            <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <br />

            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br />

            <div class="form-group">
                <label for="exampleInputEmail1">Phone</label>
                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <br />

            <select onChange={(e) => handlePlanSubmit(e.target.value)}>
                <option value="">Select Organization</option>
                {plan.length > 0 &&
                    plan.map(function (item) {
                        return (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        );
                    })}
            </select>
            <br /> <br />

            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />

            <div class="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
            </div>
            <br />


            <p className="forgot-password text-left">
                <a href="/User-Login">Login</a>
            </p>
            <br />
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    );
}

export default Register;