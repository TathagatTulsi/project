import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [plan, setPlan] = useState([])
    const [subId, setSubId] = useState()
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post('http://localhost:3500/registerOrganization', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                subscriptionId: subId
            });

            if (res.data.success === true) {

                toast.success(res.data.msg)
                localStorage.setItem("token", res.data.token);
                navigate("/loginOrganization")
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

    // const fetchData = async () => {
    //     const result = await axios.get('http://localhost:3500/getOrganization')
    //     console.log(result)
    //     setSubId(result)

    // }
    const getSubscriptionData = async () => {
        const res = await axios.get("http://localhost:3500/getSuscriber")
        setPlan(res.data.subAdd)
    }

    useEffect(() => {
        getSubscriptionData()
    }, [])

    const handlePlanSubmit = (selectedPlanId) => {
        setSubId(selectedPlanId)
    };

    return (

        <form onSubmit={Register}>
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

            <select onChange={(e) => handlePlanSubmit(e.target.value)}>
                <option value="">Select Plan</option>
                {plan.length > 0 &&
                    plan.map(function (item) {
                        return (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        );
                    })}
            </select>
            <br />

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
                <a href="/loginOrganization">Login</a>
            </p>
            <br />
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    );
}

export default Register;