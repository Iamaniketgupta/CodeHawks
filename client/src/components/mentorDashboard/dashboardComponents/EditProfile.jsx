import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const EditProfile = () => {


    const [loader,setLoader] =useState(false)


    return (
        <div>
            <h2 className="m-3  p-2 text-2xl font-bold">Edit Profile</h2>
            <div className="m-3 border-2 p-2">

                <div className="w-20 h-20 bg-contain overflow-clip relative rounded-full ring ring-blue-500 mx-auto">
                    <img src="" alt="" className="w-full h-full " />
                    {
                        loader &&
                    <div className=" inset-0 absolute inline-flex items-center justify-center">

                        <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
                    </div>}
                    <FaEdit title="Edit Image"
                        className="z-10 absolute bottom-3 right-3 text-blue-900 cursor-pointer" />

                </div>

                {/*  My Details */} 

                <div className="p-2 my-4">
                    <p>Name</p>
                    <input
                    className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                     type="text" name="fullName" />

                    <p>Profession</p>
                    <input
                    className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                     type="text" name="fullName" />

                    <p>Linkedin</p>
                    <input
                    className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blude-300"
                     type="text" name="fullName" />


                    <p>About</p>
                    <textarea
                    className="px-3 my-2 rounded-lg w-full outline-offset-2 border-2 border-blude-300"
                     type="text" name="fullName" ></textarea>




                </div>


            </div>
        </div>
    );
}

export default EditProfile;
