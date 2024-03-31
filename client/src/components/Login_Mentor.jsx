import React,{useState} from 'react'
import '../Forms.css';
export default function Login_Mentor() {
    const [cred,setCred]=useState({email:"",password:""});
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
      }
  return (
    <>
    <section className="my-2 vh-100">
        <form className="container h-100" method="post">
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
                                    <input type="email" onChange={onChange} value={cred.email} className="form-control form-contro" id="email" name="email" placeholder="example@example.com" required/>
                                </div>
                            </div>
                            <hr className="mx-n3" />
                            <div className="row align-items-center py-3">
                                <div className="col-md-3 ps-md-5">
                                    <h6 className="mb-1">Password</h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                    <input type="password" onChange={onChange} value={cred.password}  id="password" name="password" className="form-control form-contro" placeholder="Your password" required/>
                                </div>
                            </div>
                            <hr className="mx-n3" />
                           <div className="px-5 py-4 float-end">
                                <button type="submit" className="btn btn-primary btn">Login</button>
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
