import { useState } from "react";
import { FaEdit, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdSwitch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { login } from '../../../store/authSlice'
import { SERVER_URL } from "../../../../constant";
import { token } from "../../constants";

const EditProfile = () => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    // console.log(user);

    const [loader, setLoader] = useState(false);
    const [fullName, setfullName] = useState(user.fullName || "");
    const [profession, setprofession] = useState(user.profession || "")
    const [experience, setexperience] = useState(user.experience || "");
    const [linkedin, setlinkedin] = useState(user.linkedin || "")
    const [visible, setVisible] = useState(user.status || false);
    const [workExp, setWorkExp] = useState(user.workExp || []);
    const [description, setdescription] = useState(user.description || "")
    // console.log(workExp)


    const updateDetails = async () => {
        setLoader(true)
        const data = {
            fullName,
            profession,
            experience,
            linkedin,
            status: visible,
            workExp,
            description
        }
        try {
            const response = await axios.post(SERVER_URL+"/api/v1/mentor/editProfile", {...data,headers: { Authorization: `Bearer ${token}`}},{ headers: { Authorization: `Bearer ${token}`}});
            // console.log(response.data)
            const obj = {
                user: response.data.data
            }
            dispatch(login(obj));
            
            console.log(obj);
            const fullname= response.data.data?.fullName;
            const mentorName = fullname.replace(" ","-").toLowerCase();
            navigate(`/mentor/dashboard/${mentorName}`);
            toast.success("Profile updated");

        } catch (error) {
            toast.error("Failed");
            // console.log(error.message)

           
        } finally {
            setLoader(false);
        }

    }


    const changeAvatar = async (e) => {
        setLoader(true);
        const input = document.querySelector("#avatar");
        const file = input.files[0];

        try {
            const formData = new FormData();
            formData.append('avatar', file);


            const response = await axios.post(SERVER_URL+"/api/v1/mentor/updateMentorAvatar", { avatar: file ,headers: { Authorization: `Bearer ${token}`}},{ headers: { Authorization: `Bearer ${token}`}});

            const obj = {
                user: response.data.data
            }
            dispatch(login(obj))


        } catch (error) {
            toast.success("Update Failed");
            console.log(error);
        } finally {
            setLoader(false);
        }
    }


    const handleWorkExpChange = (idx, value) => {
        const updatedWorkExp = [...workExp];
        updatedWorkExp[idx] = value;
        setWorkExp(updatedWorkExp);

    };


    function addWork(e) {
        setWorkExp((prev) => ([...prev, '']))
    }



    return (
        <div className="p-4 sm:ml-64 text-black">
            <div className="p-4  border-gray-200 border-2 rounded-lg dark:border-gray-700 mt-14">
                <div>
                    <h2 className="m-3  p-2 text-2xl font-bold">Edit Profile</h2>
                    <div className="flex items-center">
                        <p className="m-3  p-2 text-xl font-semibold">Profile visibility : </p>
                        {
                            visible ?
                                <FaToggleOn onClick={() => setVisible(false)}
                                    className="text-green-600 cursor-pointer text-2xl" title="Visible" /> :

                                <FaToggleOff onClick={() => setVisible(true)}
                                    className="text-red-600 cursor-pointer  text-2xl" title="Hidden" />
                        }
                    </div>




                    <div className="border-2 p-2">

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


                        <div className=" ">

                            {/*  My Details */}

                            <div className="p-2 my-4 ">
                                <p>Name</p>
                                <input
                                    className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                                    type="text" name="fullName"
                                    value={fullName}
                                    onChange={(e) => setfullName(e.target.value)}
                                />

                                <p>Profession</p>
                                <input
                                    className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                                    type="text" name="fullName"
                                    value={profession}
                                    onChange={(e) => setprofession(e.target.value)}
                                />

                                <p>Experience</p>
                                <input
                                    className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                                    type="number" name="fullName"
                                    value={experience}
                                    onChange={(e) => setexperience(e.target.value)}
                                />

                                <p>Linkedin</p>
                                <input
                                    className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                                    type="text" name="fullName"
                                    value={linkedin}
                                    onChange={(e) => setlinkedin(e.target.value)}
                                />




                            </div>

                            {/* Work Experience */}
                            <div className="m-2">
                                <div>
                                    <button onClick={addWork}
                                        className="inline-block my-2 rounded-lg text-white text-xs font-bold cursor-pointer bg-blue-500 p-2">Add Companies</button>

                                </div>
                                {
                                    workExp?.map((item, idx) =>
                                        <div className="" key={idx}>
                                            <p>Company {idx + 1}</p>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                                                    type="text" name="fullName"
                                                    value={item}
                                                    onChange={(e) => {
                                                        handleWorkExpChange(idx, e.target.value)
                                                    }}
                                                />

                                                <MdDelete className="text-lg text-red-500 cursor-pointer"
                                                    onClick={() => setWorkExp(() => workExp?.filter((item, itemIdx) => itemIdx !== idx))} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {/* about */}
                            <div className=" mx-3 w-[90%] my-2">
                                <p>About</p>
                                <textarea
                                    className="px-3 min-h-[120px] my-2 rounded-lg w-full outline-offset-2 border-2 border-blude-300"
                                    type="text" name="fullName"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                ></textarea>
                            </div>

                        </div>

                    </div>

                    <button className="lg:w-[270px] mx-auto block my-3 rounded-lg text-white font-bold cursor-pointer bg-blue-500 p-3" onClick={updateDetails} >Save Changes</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
