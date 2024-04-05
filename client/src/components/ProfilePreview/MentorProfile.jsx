import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';

import { useLocation, useNavigate } from 'react-router-dom';
const MentorProfile = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [slotsData, setSlotsData] = useState([]);

    const [selectedSlot, setSelectedSlot] = useState(null);

    const [slotloader, setSlotLoader] = useState(false);


    // const [userDetails,setUserDetails]= useState({});


    async function getAllSlots() {
        try {
            setSlotLoader(true);
            const mentorId = state._id;
            // console.log(mentorId)
            const response = await axios.get('/api/v1/timeslot/getAllSlots', {
                params: {
                    mentorId: mentorId
                }
            });
            // console.log(response)

            setSlotsData(response.data.data);
            setSlotLoader(false);

        } catch (error) {
            setSlotLoader(false);
        }
    }
    const [myprice, setMyPrice] = useState({});



    async function fetchPricing() {
        try {
            const response = await axios.get(`/api/v1/mentor/pricing/${state._id}`);
            // console.log("hello ");
            setMyPrice(response.data.pricing);
            // console.log(pricingData);
        } catch (error) {
            setMyPrice({});
            // console.error('Error fetching pricing:', error.message);
        }
    }

    useEffect(() => {
        fetchPricing();
        getAllSlots();
    }, []);


    const bookMyTrail = async () => {
        try {
            
            if(!selectedSlot)
            toast.error("Please Select a slot");
        const res = await axios.post("/api/v1/timeslot/bookSlot",{selectedSlot});
        if(res.status === 200) {
            toast.success("Booked Success");
        }
        selectedSlot(null);
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);

        }
    }


 const your_stripe_public_key ="pk_test_51P1gnJSJzjqVqPS4GUjR3KrNnajTe3KyhC2LVeimTlxth7DFiL5TznffkNHYtbxfvocGYacl1Qbh3G5w9ZvmklUW00fwzf1dXj";
 const stripePromise = loadStripe('your_stripe_public_key');
 const buyMentorship = async (mentorId) => {
    try {
        // Retrieve the Stripe object from the Stripe promise
        console.log(state._id);
        const stripe = await stripePromise;
        // Make a request to your backend to create a checkout session
        const res = await axios.post(`/api/v1/payment/checkout-session/${state._id}`, {
            headers: {
                Authorization: `Bearer ${your_stripe_public_key}`
            }
        });

        // Check if the response contains the session URL
        if (!res || !res.data.session.url) {
            throw new Error("Payment Failed");
        }

        // Redirect the user to the checkout page
        window.location.href = res.data.session.url;
    } catch (error) {
        toast.error("Some Error Occurred: " + error.message);
        console.log(error);
    }
};
    return (

        <div>

            <div className='grid gap-10 lg:grid-cols-3'>


                <div className='m-4 p-3 lg:col-span-2'>

                    <div className='flex items-center justify-between'>

                        <div className='p-2 rounded-xl w-32 h-32 bg-black my-3'>

                            <img src={state?.avatar || "/"} alt={state.fullName} className='w-full h-full' />
                        </div>

                    </div>

                    <div className='flex   justify-between p-3 flex-wrap gap-3 '>
                        <div>

                            <div className=' text-2xl font-bold'>
                                {state.fullName}
                            </div>
                            <div className='font-semit text-xl'>
                                {state.profession || "-no profession found"}
                            </div>

                            {/* 
                            <div className='flex gap-3 text-xs my-2'>
                                <p className='p-2 border-2 rounded-lg'>Frontend</p>
                                <p className='p-2 border-2 rounded-lg'>Frontend</p>
                            </div> */}

                        </div>


                        <div>
                            <div className='p-3 max-w-[250px] border-2'>
                                <p>{state.experience || "1"} + years of experience</p>


                                <p className='text-xs mt-3 text-blue-500 font-semibold'>Companies Experience </p>
                                {
                                    state.workExp?.map((item, idx) =>
                                        <p key={idx} className='font-semibold text-lg'>{item} </p>
                                    )
                                }

                            </div>
                        </div>


                    </div>

                    {/* Description */}
                    <div className='p-3'>
                        <h3>About</h3>
                        {state.about || "-no description found"}
                    </div>

                    <div className='mx-3 my-2 bg-yellow-200 border-2 border-yellow-400 rounded-lg px-2 py-1 inline-block'>
                        <span>{state.rating + " Stars"}</span>
                    </div>

                    <div className='pl-3'>
                        <div className='p-2 border-2 inline-block px-3'>
                            <p>{state.state}, {state.country}</p>
                        </div>
                        <a href={state.linkedin || "#"} className='mx-2 w-10 h-10 rounded-full border-2 inline-flex bg-blue-500 items-center justify-center text-white font-bold'>In</a>

                        <div >
                            <p className='my-3 '>
                                Languages That i speak
                            </p>

                            {

                                state.languages?.map((item) =>
                                    <p key={item} className='p-2  border-2 inline-block'>
                                        {item}
                                    </p>
                                )

                            }
                            {state.languages.length === 0 && <p><i>-No Languages found</i></p>}

                        </div>
                    </div>

                </div>


                {/* Slots and Subscription */}

                <div className='px-3 lg:px-0 mt-3 border-2 my-3 mr-3'>

                    <div className='slots border-2 my-3 mr-3 p-3'>
                        <h3 className='p-2 font-semibold text-2xl'>

                            Available Free Trail Slots
                        </h3>
                        <div className='flex gap-3'>

                            {slotloader ? <div className="text-center relative bottom-11"> Wait..</div> : ''}

                            <div className=" mx-auto w-[70%] flex flex-wrap gap-3 justify-center items-center">
                                {
                                    slotsData.length === 0 && "No Slots Found"
                                }
                                {
                                    slotsData?.map((slot) =>
                                        <div key={slot?._id} onClick={() => {
                                            return setSelectedSlot((prev) => prev !== slot?._id ? slot?._id : null)
                                        }} className={`relative flex min-w-[100px] cursor-pointer items-center rounded-lg justify-center pr-3 pl-1 bg-slate-100 ${selectedSlot === slot._id ? "bg-blue-300 border-4 border-blue-700" : ''}`}>

                                            <div className="w-16 h-16 m-2 inline-flex items-center justify-center rounded-xl bottom-2 border-4 border-blue-500 border-outset">
                                                <div>
                                                    <p className="text-2xl font-semibold ">{slot?.date}</p>
                                                    <p>{slot?.monthName}</p>
                                                </div>
                                            </div>
                                            <div className="font-semibold text-lg m-3">{slot?.time}</div>
                                            <div className='absolute top-2 right-2'>
                                            {
                                                slot?.isBooked?
                                                <div className='text-xs bg-red-600 text-white px-2 rounded-lg'>Booked</div>
                                                :<div className='text-xs bg-green-600 text-white px-2 rounded-lg'>Available</div>
                                            }

                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <button onClick={bookMyTrail}
                            className={`inline-block px-3 my-3  py-2 bg-blue-500 rounded-xl text-white font-semibold 
                        ${!selectedSlot ? "opacity-20 cursor-not-allowed" : ''}`} disabled={!selectedSlot}>
                            Book Free Trail</button>

                    </div>


                    {/*  Pricing */}

                    <div className='p-2 border-2 my-3 mr-3'>
                        <h3 className='p-2 font-semibold text-2xl'>
                            Buy Mentorship</h3>
                        <div className='p-2 my-2'>
                            {myprice?.specialties?.map((item, idx) =>
                                <p key={idx} className='p-2 border-2 inline-block m-1 text-xs rounded-lg'>{item}</p>
                            )
                            }
                            </div>
                            <div className='inline-flex gap-3'>
                            <p className='font-semibold text-blue-500'>for :</p>

                            {myprice?.targetInterest
                            }
                        </div>

                        <div className={`font-bold text-3xl my-3 ${!myprice?.mentorshipPrice && "text-lg text-red-500"}`}>
                            <p>{myprice?.mentorshipPrice || "-No Pricing Found"}</p>
                        </div>
                        <button onClick={() => buyMentorship()}
                            className={`inline-block px-3 py-2 bg-blue-500 rounded-xl text-white font-semibold 
                        ${!myprice?.mentorshipPrice ? "opacity-20 cursor-not-allowed" : ''}`} disabled={!myprice?.mentorshipPrice}>
                            Buy 1:1 Mentorship</button>

                    </div>


                </div>
            </div>
        </div>
    );
}

export default MentorProfile;
