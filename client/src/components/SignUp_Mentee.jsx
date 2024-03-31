import '../Forms.css';
import React from 'react';
export default function SignUp_Mentee() {
    const handlePart1 = () => {
        const name=document.getElementById("name").value.replaceAll(" ","");
        const email=document.getElementById("email").value.replaceAll(" ","");
        const password=document.getElementById("password").value.replaceAll(" ","");
        const confirm_password=document.getElementById("confirm_password").value.replaceAll(" ","");
        if(name && email && password && confirm_password &&  password==confirm_password){
        document.getElementById("part1").style.display = "none";
        document.getElementById("part2").style.display = "block";
        }
    }
    const handlePart2 = () => {
        document.getElementById("part2").style.display = "none";
        document.getElementById("part1").style.display = "block";
    }
    return (
        <>
            <section className=" vh-100">
                <form className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body">
                                    <h1 className='my-2'>SignUp as a Mentee</h1>

                                    <div id="part1">
                                        {/* Name */}
                                        <div className="row align-items-center pt-4 pb-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Full name</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input type="text" id="name" name="name" placeholder="Enter your name" className="form-control form-control" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />
                                        {/* Email */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Email address</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input id="email" name="email" type="email" className="form-control form-contro" placeholder="example@example.com" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />

                                        {/* Password */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Password</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input type="password" id="password" name="password" className="form-control form-contro" placeholder="Your password" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />

                                        {/* Confirm Password */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Confirm Password</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input type="password" id="confirm_password" name="confirm_password" className="form-control form-contro" placeholder="Confirm Your password" required />
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
                                                <input type="text" id="country" name="country" className="form-control form-contro" placeholder="Country" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />

                                        {/* Experience */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Experience</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <select className="form-select form-select" aria-label=".form-select-lg example" id="experience" name="experience">
                                                    <option value="">Your Experience</option>
                                                    <option value="1">Fresher</option>
                                                    <option value="2">Experienced</option>
                                                </select>
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />

                                        {/* LinkedIn */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Linkedin</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input type="url" id="linkedin" name="linkedin" className="form-control form-contro" placeholder="LinkedIn URL" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />

                                        {/* ProfilePic */}
                                        <div className="row align-items-center pt-4 py-3">
                                            <div className="col-md-3 ps-md-5">
                                                <h6 className="mb-1">Upload Picture</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input id="profile_pic" name="profile_pic" className="form-control form-control" type="file" accept="image/*" required />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />

                                        <div className="px-5 py-4 float-start">
                                            <button type="button" onClick={handlePart2} className="btn btn-primary btn">Previous</button>
                                        </div>
                                        <div className="px-5 py-4 float-end">
                                            <button type="submit" className="btn btn-primary btn">SignUp</button>
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
