import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './Forms.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import toast from 'react-hot-toast';


export default function Login_Mentor() {

    const [cred, setCred] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/v1/mentor/login', cred);
            // console.log(response);
            const obj = {
                user: response.data.user
            }
            dispatch(login(obj));
            console.log(obj);
            toast.success('Login successful!');
            setLoading(false)

            const fullname= response.data.user.fullName;
            const mentorName = fullname.replace(" ","-").toLowerCase();

            navigate(`/mentor/dashboard/${mentorName}`);

        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || "Failed! Something went Wrong");
            setLoading(false);
        }
    }

    return (
        <>
            <section className="vh-100 form">
                <form className="container h-100" onSubmit={handleSubmit}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body">
                                    <h1 className='my-2'>Login as a Mentor</h1>
                                    <div className="row align-items-center py-3">
                                        <div className="col-md-3 ps-md-5">
                                            <h6 className="mb-1">Email address</h6>
                                        </div>
                                        <div className="col-md-9 pe-5">
                                            <input type="email" onChange={onChange} value={cred.email} className="form-control form-contro" id="email" name="email" placeholder="example@example.com" required />
                                        </div>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="row align-items-center py-3">
                                        <div className="col-md-3 ps-md-5">
                                            <h6 className="mb-1">Password</h6>
                                        </div>
                                        <div className="col-md-9 pe-5">
                                            <input type="password" onChange={onChange} value={cred.password} id="password" name="password" className="form-control form-contro" placeholder="Your password" required />
                                        </div>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="px-5 py-4 float-end">
                                        <button type="submit" className="btn btn-primary btn">
                                            {loading ?
                                                <div className="animate-spin inline-block size-6 border-[5px] border-current border-t-transparent text-ehite rounded-full" role="status" aria-label="loading">
                                                </div> : ''}
                                            {!loading && "Login"}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}
