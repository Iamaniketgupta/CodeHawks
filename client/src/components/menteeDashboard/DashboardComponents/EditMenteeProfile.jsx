import { useState } from "react";
import { FaEdit, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdSwitch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useNavigate} from 'react-router-dom';
import {login} from '../../../store/authSlice'
import { SERVER_URL } from "../../../../constant";

const EditMenteeProfile = () => {

    
    const user = useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();

const navigate =  useNavigate()
    
    const [loader, setLoader] = useState(false);
    const [fullName, setfullName] = useState(user.fullName || "");
    const [country, setcountry] = useState(user.country || "")
    const [state, setstate] = useState(user.state || "")
    const [experience, setexperience] = useState(user.experience || "");
    const [linkedin, setlinkedin] = useState(user.linkedin || "")
    const [interests, setinterests] = useState(user.interests || []);


    const updateDetails = async()=>{
        setLoader(true)
        const data = {
            fullName ,
            experience,
            linkedin,
            country,
            state,
            interests
        }
        try {
            const response = await axios.post( SERVER_URL + "/api/v1/mentee/updateMenteeProfile", data, {
              });

            //   console.log(response.data.data)
              const obj = {
                user:response.data.data
              }
              dispatch(login(obj))
              toast.success("Profile updated");
              navigate("/mentee/dashboard");
            
        } catch (error) {
            toast.success("Update Failed");
        }finally{
            setLoader(false);
        }

    }

    
    const changeAvatar = async (e) => {
        setLoader(true);
        const input = document.querySelector("#avatar");
        const file = input.files[0];
        // console.log(file)
        try {
          const formData = new FormData();
          formData.append('avatar', file);
        //   console.log(formData)
      
          const response = await axios.post( SERVER_URL + "/api/v1/mentee/updateMenteeAvatar", {avatar : file}, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

        //   console.log(response.data.data);
          const obj = {
            user:response.data.data
          }
          dispatch(login(obj))
          

        } catch (error) {
          console.log(error);
        }finally{
            setLoader(false);
        }
      }


    

      const handleWorkExpChange = (idx, value) => {
        const updateInterests = [...interests];
        updateInterests[idx] = value;
        setinterests(updateInterests);
        
    };


    function addWork(e) {
        setinterests((prev) => ([...prev, '']))
    }



    return (
        <div>
            <h2 className="m-3  p-2 text-2xl font-bold">Edit Profile</h2>
            {/* <div className="flex items-center">
                <p className="m-3  p-2 text-xl font-semibold">Profile visibility : </p>
                {
                    visible ?
                        <FaToggleOn onClick={() => setVisible(false)}
                            className="text-green-600 cursor-pointer text-2xl" title="Visible" /> :

                        <FaToggleOff onClick={() => setVisible(true)}
                            className="text-red-600 cursor-pointer  text-2xl" title="Hidden" />
                }
            </div> */}




            <div className="m-3 border-2 p-2">

                <div className="w-20 h-20 bg-contain overflow-clip relative rounded-full ring ring-blue-500 mx-auto">
                    <img src={user.avatar} alt="" className="w-full h-full " />
                    {
                        loader &&
                        <div className=" inset-0 absolute inline-flex items-center justify-center">

                            <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
                            
                        </div>}
                        <input 
                        type="file" 
                        name="avatar" 
                        id="avatar" 
                        onChange={changeAvatar} 
                        encType="multipart/form-data" 
                        hidden 
                        />
                    <label htmlFor="avatar">
                        <FaEdit title="Edit Image"
                            className="z-10 absolute bottom-3 right-3 text-blue-900 cursor-pointer" />
                    </label>
                </div>


                <div className=" grid mx-3  place-items-center">

                    {/*  My Details */}

                    <div className="p-2 my-4 ">
                        <p>Name</p>
                        <input
                            className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                            type="text" name="fullName"
                            value={fullName}
                            onChange={(e)=>setfullName(e.target.value)}
                            />

                        <p>Country</p>
                        <input
                            className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                            type="text" name="fullName"
                            value={country}
                            onChange={(e)=>setcountry(e.target.value)}
                            />

                        <p>State</p>
                        <input
                            className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                            type="text" name="fullName"
                            value={state}
                            onChange={(e)=>setstate(e.target.value)}
                            />

                        <p>Experience</p>
                        <input
                            className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                            type="number" name="fullName"
                            value={experience}
                            onChange={(e)=>setexperience(e.target.value)}
                            />

                        <p>Linkedin</p>
                        <input
                            className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                            type="text" name="fullName"
                            value={linkedin}
                            onChange={(e)=>setlinkedin(e.target.value)}
                            />




                    </div>

                    {/* Work Experience */}
                    <div className="m-2">
                        <div>
                            <button onClick={addWork}
                                className="inline-block my-2 rounded-lg text-white text-xs font-bold cursor-pointer bg-blue-500 p-2">Add Interests</button>

                        </div>
                        {
                            interests?.map((item, idx) =>
                                <div className="" key={idx}>
                                    <p>Interest {idx + 1}</p>
                                    <div className="flex items-center gap-2">
                                        <input
                                            className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                                            type="text" name="fullName"
                                            value={interests[idx]}
                                            onChange={(e)=>{
                                                handleWorkExpChange(idx , e.target.value)
                                            }}
                                            />

                                        <MdDelete className="text-lg text-red-500 cursor-pointer"
                                            onClick={() => setinterests(() => interests?.filter((item, itemIdx) => itemIdx !== idx))} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {/* about */}
                    {/* <div className=" mx-3 w-[90%] my-2">
                        <p>About</p>
                        <textarea
                            className="px-3 min-h-[120px] my-2 rounded-lg w-full outline-offset-2 border-2 border-blude-300"
                            type="text" name="fullName"
                            value={description}
                            onChange={(e)=>setdescription(e.target.value)}
                            ></textarea>
                    </div> */}

                </div>

            </div>

            <button className="lg:w-[270px] mx-auto block my-3 rounded-lg text-white font-bold cursor-pointer bg-blue-500 p-3" onClick={updateDetails} >Save Changes</button>
        </div>
    );
}

export default EditMenteeProfile;
