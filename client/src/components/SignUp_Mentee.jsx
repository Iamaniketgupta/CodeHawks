import axios from 'axios';
import './Forms.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp_Mentee() {
    
    const handlePart1 = () => {
        const fullName = document.getElementById("fullName").value.replaceAll(" ", "");
        const email = document.getElementById("email").value.replaceAll(" ", "");
        const password = document.getElementById("password").value.replaceAll(" ", "");
        const confirm_password = document.getElementById("confirm_password").value.replaceAll(" ", "");
        if (fullName && email && password && confirm_password && password === confirm_password) {
            document.getElementById("part1").style.display = "none";
            document.getElementById("part2").style.display = "block";
        }
    }
    const handlePart2 = () => {
        document.getElementById("part2").style.display = "none";
        document.getElementById("part1").style.display = "block";
    }

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        country: '',
        state: '',
        experience: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/v1/mentee/signup', formData);
            console.log(response.data);
            toast.success('Sign up successful!');
            setLoading(false)
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error signing up. Please try again.');
            setLoading(false)
        }
    }
    return (
        <>
            <section className="min-vh-100 form">
                <form className="container h-100" onSubmit={handleSubmit}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9 mt-md-5">
                            <div className="card mt-5" style={{ borderRadius: "15px" }}>
                                <div className="card-body m-md-5">
                                    <h1 className='my-2'>SignUp as a Mentee</h1>
                                    <div id="part1">
                                        {/* Name */}
                                        <div className="row align-items-center pt-4 pb-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Full name</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input onChange={handleChange} value={formData.fullName}
                                                    type="text" id="fullName" name="fullName" placeholder="Enter your name" className="form-control form-control" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />
                                        {/* Email */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Email address</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input onChange={handleChange} value={formData.email}
                                                    id="email" name="email" type="email" className="form-control form-contro" placeholder="example@example.com" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />

                                        {/* Password */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Password</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input onChange={handleChange} value={formData.password}
                                                    type="password" id="password" name="password" className="form-control form-contro" placeholder="Your password" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />

                                        {/* Confirm Password */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Confirm Password</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input
                                                    type="password" id="confirm_password" name="confirm_password" className="form-control form-contro" placeholder="Confirm Your password" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />

                                        <div className="px-5 py-4 float-end">
                                            <button type="button" onClick={handlePart1} className="btn btn-primary btn">Next</button>
                                        </div>
                                    </div>

                                    <div id="part2">
                                        {/* Country */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Country</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input onChange={handleChange} value={formData.country}
                                                    type="text" id="country" name="country" className="form-control form-contro" placeholder="Country" required />
                                            </div>
                                        </div>

                                        <hr className="mx-n3" />

                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">State</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input onChange={handleChange} value={formData.state}
                                                    type="text" id="state" name="state" className="form-control form-contro" placeholder="State" required />
                                            </div>
                                        </div>

                                        <hr className="mx-n3" />

                                        {/* Experience */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Experience</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <select onChange={handleChange} value={formData.experience}
                                                    className="form-select form-select" aria-label=".form-select-lg example" id="experience" name="experience">
                                                    <option value="">Your Experience</option>
                                                    <option value="1">Fresher</option>
                                                    <option value="2">Experienced</option>
                                                </select>
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />


                                        <div className="px-5 py-4 float-start">
                                            <button type="button" onClick={handlePart2} className="btn btn-primary btn">Previous</button>
                                        </div>
                                        <div className="px-5 py-4 float-end">
                                            <button type="submit" className="btn btn-primary btn flex text-white">
                                                {loading ?
                                                    <div className="animate-spin inline-block size-6 border-[5px] border-current border-t-transparent text-ehite rounded-full" role="status" aria-label="loading">
                                                    </div> : ''}
                                                {!loading && "SignUp"}</button>
                                        </div>
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
