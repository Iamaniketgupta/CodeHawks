import InputComp from "./subcomponents/InputComp";
import Buttons from "./subcomponents/Buttons";
import { useState } from "react";
import { useNavigate} from 'react-router-dom'
import { login, logout} from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from '../utils/user.data.fetch.js'
const Login = () => {
    const [data, setData] = useState({
        email: "",
        phoneNo: "",
        password: ""

    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.auth.user)
    
    console.log(user)

    const [giveEmail, setgiveEmail] = useState(true);
    const changeParameter = ()=>{
        setgiveEmail((prev)=>!prev);
    }

    const loginHandler = async (e) => {
        e.preventDefault();

        const response = await loginUser(data);
        if(response){
            const obj = {
                user:response.data.user
            }
            dispatch(login(obj));
            console.log(user)
            navigate('/api/dashboard');
        }
    
     
    }
    

    const handleSetData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div className="flex justify-center items-center h-screen overflow-hidden text-xs">
            <div className="flex flex-col justify-center w-[290px] h-fit py-8 px-5 text-white dark:text-slate-800 dark:bg-white bg-slate-800 text-inherit rounded-2xl">
                <h2 className="font-bold text-2xl text-center my-3">Log In</h2>
                <form onSubmit={loginHandler} >
                    {giveEmail ? (
                        <InputComp
                        value={data.email}
                        name="email"
                        onChange={(e)=>handleSetData(e)}
                        type="email"
                        label="Enter Email"
                        id="email"
                        required
                        placeholder="Enter Email"
                    />
                    ) : (
                        <InputComp
                        value={data.phone}
                        onChange={(e)=>handleSetData(e)}
                        type="tel"
                        label="Phone"
                        id="phoneNo"
                        name="phoneNo"
                        placeholder="Enter Phone"
                    />
                    )}
                    <button onClick={changeParameter} className="dark:text-white w-[80%] mx-auto bg-blue-500 my-3 block">
                        {giveEmail ? "Use Phone Number":"Use email"}
                    </button>
                    
                    <InputComp
                        value={data.password}
                        onChange={(e)=>handleSetData(e)}
                        type="password"
                        label="Password"
                        id="password"
                        name="password"
                        required
                        placeholder="Enter Password"
                    />
                    <Buttons text="Log In"/>
                </form>
            </div>
        </div>
    );
}

export default Login;
