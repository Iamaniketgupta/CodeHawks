import { useState } from "react";
import { FaEdit, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdSwitch } from "react-icons/io";

const EditProfile = () => {


    const [loader, setLoader] = useState(false);

    const [visible, setVisible] = useState(false);

    const [workExp, setWorkExp] = useState([]);

    function addWork(e) {
        setWorkExp((prev) => ([...prev, '']))
    }



    return (
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




            <div className="m-3 border-2 p-2">

                <div className="w-20 h-20 bg-contain overflow-clip relative rounded-full ring ring-blue-500 mx-auto">
                    <img src="" alt="" className="w-full h-full " />
                    {
                        loader &&
                        <div className=" inset-0 absolute inline-flex items-center justify-center">

                            <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
                        </div>}

                    <input type="file" name="avatar" id="avatar" hidden />
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
                            type="text" name="fullName" />

                        <p>Profession</p>
                        <input
                            className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                            type="text" name="fullName" />

                        <p>Experience</p>
                        <input
                            className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                            type="number" name="fullName" />

                        <p>Linkedin</p>
                        <input
                            className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                            type="text" name="fullName" />




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
                                            type="text" name="fullName" />

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
                            type="text" name="fullName" ></textarea>
                    </div>

                </div>

            </div>

            <button className="lg:w-[270px] mx-auto block my-3 rounded-lg text-white font-bold cursor-pointer bg-blue-500 p-3">Save Changes</button>
        </div>
    );
}

export default EditProfile;
