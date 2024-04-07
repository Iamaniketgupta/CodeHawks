import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoRefreshCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { SERVER_URL } from "../../../../constant";
import { token } from "../../constants";

const MySlots = () => {

    const [loading, setLoading] = useState(false);
    // dummy
    // const [slotsData, setSlotsData] = useState([{ date: "03", monthName: "apr", time: "33:00" }]);
    const [slotsData, setSlotsData] = useState([]);

    const [slotloader, setSlotLoader] = useState(false);

    async function getAllSlots() {
        try {
            setSlotLoader(true);
            const response = await axios.get(SERVER_URL+'/api/v1/mentor/getAllSlots',{ headers: { Authorization: `Bearer ${token}`}});
            setSlotsData(response.data?.data);
            setSlotLoader(false);

        } catch (error) {
            setSlotLoader(false);

        }
    }

    useEffect(() => {
        getAllSlots();
    }, []);

    async function handleDeleteSlot(slotId) {
        try {
            setSlotLoader(true);
            if (!confirm("Are you sure ?"))
                return;

            const response = await axios.delete(SERVER_URL+`/api/v1/timeslot/deleteSlots/${slotId}`,{ headers: { Authorization: `Bearer ${token}`}});
            if (response)
                toast.success("Slot Deleted")
            getAllSlots();
            setSlotLoader(false);

        } catch (error) {
            toast.error("Failed to Delete")
            setSlotLoader(false);

        }
    }


    const [data, setData] = useState({
        date: '',
        time: ''
    });
    // console.log(data)

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const date = data.date?.split("-")[2] || '';
            let month = data.date?.split("-")[1] || '';
            let monthName;

            switch (month) {
                case "01":
                    monthName = "Jan";
                    break;
                case "02":
                    monthName = "Feb";
                    break;
                case "03":
                    monthName = "Mar";
                    break;
                case "04":
                    monthName = "Apr";
                    break;
                case "05":
                    monthName = "May";
                    break;
                case "06":
                    monthName = "Jun";
                    break;
                case "07":
                    monthName = "Jul";
                    break;
                case "08":
                    monthName = "Aug";
                    break;
                case "09":
                    monthName = "Sep";
                    break;
                case "10":
                    monthName = "Oct";
                    break;
                case "11":
                    monthName = "Nov";
                    break;
                case "12":
                    monthName = "Dec";
                    break;
                default:
                    monthName = "";
                    break;
            }

            const time = data?.time;


            if (!date || !month || !time) {
                toast.error("Date and Time is Required");
                setLoading(false);
                return;
            }
            const response = await axios.post(SERVER_URL+'/api/v1/timeslot/addTimeslot', { date, month, monthName, time,headers: { Authorization: `Bearer ${token}`} },{ headers: { Authorization: `Bearer ${token}`}});
            // console.log(response.data);
            toast.success("Slot Added");
            getAllSlots();
            setData({ date: '', time: '' });
            setLoading(false);

        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong!!");

        }

    }


    function handleDataChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="p-4 sm:ml-64 text-black">
        <div className="p-4  border-gray-200 border-2 rounded-lg dark:border-gray-700 mt-14">
        <div className="pb-5">
            <div className="p-2 my-5">
                <h2 className="text-3xl font-bold text-center">
                    My Slots
                </h2>
            </div>

            <form className="w-full pl-4 text-center" onSubmit={handleSubmit}>
                <h3 className="text-2xl font-semibold"> Create Your Trail Slots</h3>
                <hr />
                <div className="flex gap-5 my-4 text-center items-center justify-center">

                    <div>
                        <h3 className="my-2">Select Date </h3>
                        <input onChange={handleDataChange} value={data.date}
                            type="date" name="date" id="date" />
                    </div>
                    <div>

                        <h3 className="my-2">Select Time Slot</h3>
                        <input onChange={handleDataChange} value={data.time}
                            type="time" name="time" id="" />
                    </div>

                </div>
                <button type="submit" className="btn btn-primary btn ">
                    {loading ?
                        <div className="animate-spin inline-block size-6 border-[5px] border-current border-t-transparent text-ehite rounded-full" role="status" aria-label="loading">
                        </div> : ''}
                    {!loading && "Add Slot"}
                </button>

            </form>
            <hr className="my-3" />


            {/*  My Slots */}

            <div className="relative">
                <div className="text-blue-500 absolute right-7 top-10 cursor-pointer">
                    <IoRefreshCircle onClick={getAllSlots} size={30} title={"Refresh slots"} />
                </div>

                <div className="p-2 my-5">
                    <h2 className="text-2xl font-semibold text-center">
                        My Available Slots
                    </h2>
                </div>




                {slotloader ? <div className="text-center relative bottom-11"> Wait..</div> : ''}
                <div className=" mx-auto w-[70%] flex flex-wrap gap-3 justify-center items-center">
                    {
                        !slotsData && "No Slots Found"
                    }
                    {
                        slotsData?.map((slot) =>
                            <div key={slot?._id} className={`relative flex min-w-[100px] items-center rounded-lg justify-center pr-3 pl-1 bg-slate-100 ${slot?.isBooked?"cursor-not-allowed":""}`}>
                                <MdDelete onClick={() => handleDeleteSlot(slot._id)}
                                    className="text-red-600 absolute right-2 top-2 cursor-pointer" title="Delete Slot" />

                                <div className="w-16 h-16 m-2 inline-flex items-center justify-center rounded-xl bottom-2 border-4 border-blue-500 border-outset">
                                    <div>
                                        <p className="text-2xl font-semibold ">{slot.date}</p>
                                        <p>{slot?.monthName}</p>
                                    </div>
                                </div>
                                <div className="font-semibold text-lg m-3">{slot?.time}</div>
                                <div className='absolute top-2 right-2'>
                                    {
                                        slot?.isBooked &&
                                            <div className='text-xs bg-red-600 text-white px-2 rounded-lg'>Booked</div>
                                            // : <div className='text-xs bg-green-600 text-white px-2 rounded-lg'>Available</div>
                                    }

                                </div>
                            </div>
                        )
                    }

                </div>


            </div>
        </div>
            </div>
        </div>
    );
}

export default MySlots;
