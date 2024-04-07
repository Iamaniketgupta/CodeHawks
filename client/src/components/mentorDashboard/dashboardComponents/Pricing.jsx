import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { SERVER_URL } from '../../../../constant';


const Pricing = () => {
    const mentorId = useSelector((state) => state.auth.user._id);

    // Fetch Pricing
    const [myprice, setMyPrice] = useState({});

    async function fetchPricing() {
        try {
            const response = await axios.get(SERVER_URL+`/api/v1/mentor/pricing/${mentorId}`);
            const pricingData = response.data.pricing;

            setMyPrice(response.data.pricing);
            // console.log(pricingData);
        } catch (error) {
            setMyPrice({});
            // console.error('Error fetching pricing:', error.message);
        }
    }

    useEffect(() => {

        fetchPricing();
    }, [])

    async function handleDeletePrice() {
        try {
             await axios.delete(SERVER_URL+'/api/v1/mentor/pricing/' + myprice._id);
            // console.log('Pricing deleted successfully');
            fetchPricing();
            toast.success("Price Deleted Successfully");
        } catch (error) {
            // console.error('Error deleting pricing:', error.message);
            toast.error("Failed to Delete");
        }
    }
    
    

    const [pricingData, setPricingData] = useState({
        mentorshipPrice: 0,
        targetInterest: '',
        specialties: []
    });
    const selectRef = useRef(null);

    const options = [
        { value: 'web development', label: 'Web Development' },
        { value: 'data science', label: 'Data Science' },
        { value: 'graphic design', label: 'Graphic Design' }
    ];

    const targetInterestOptions = [
        { value: 'fresher', label: 'Fresher' },
        { value: 'experienced', label: 'Experienced' },
        { value: 'Fresher or experienced', label: 'Fresher or experienced' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mentorshipPrice' && parseFloat(value) < 0) {
            toast.error("Enter a Valid Value");
            return;
        }
        setPricingData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSpecialtiesChange = (selectedOptions) => {
        const specialties = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setPricingData(prevState => ({
            ...prevState,
            specialties
        }));
    };
    // console.log(pricingData);
    const handleTargetInterestChange = (selectedOption) => {
        const targetInterest = selectedOption ? selectedOption.value : '';
        setPricingData(prevState => ({
            ...prevState,
            targetInterest
        }));
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post('/api/v1/mentor/pricing/new', pricingData);
            console.log('Pricing created:', response.data.pricing);
            setPricingData({
                mentorshipPrice: 0,
                targetInterest: '',
                specialties: []
            });
            toast.success("Price Created Successfully");
            fetchPricing();
            selectRef.current.select.clearValue();
        } catch (error) {
            fetchPricing();

            // console.error('Error creating pricing:', error);
            toast.error(error.response.data.message || "Failed to create");

        }
    };

    return (
        <div className="p-4 sm:ml-64 text-black">
        <div className="p-4  border-gray-200 border-2 rounded-lg dark:border-gray-700 mt-14">
            <div className='p-3 m-3'>

                <h1 className='text-3xl font-bold text-center my-3'>Mentorship Pricing</h1>
                <div>
                    <p>Mentorship Price</p>
                    <input
                        className="px-3 my-2 rounded-lg outline-offset-2 border-2 border-blue-300"
                        type="number"
                        name="mentorshipPrice"
                        min={"0"}

                        value={pricingData.mentorshipPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className='my-4'>
                    <h6 className='my-2'>Target</h6>
                    <Select
                        options={targetInterestOptions}
                        onChange={handleTargetInterestChange}
                    />
                </div>
                <div className='my-4'>
                    <h6 className='my-2'>Specialties</h6>
                    <Select
                        options={options}
                        isMulti
                        ref={selectRef}
                        onChange={handleSpecialtiesChange}
                    />
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreate}>
                        Create Pricing
                    </button>
                </div>
            </div>
            <hr />
            <div className='p-2 my-3'>
                <h2 className='p-2 my-3 text-center text-2xl font-bold'>My Pricing</h2>
                {
                    myprice._id ?(
                        <>
                            <div className=' font-semibold '>
                                MentorShip price : {myprice.mentorshipPrice || "-not found"}
                            </div>
                            <div className=' font-semibold'>
                                Target : {myprice.targetInterest ||"-not found"}
                            </div>
                            <div className='p-2'>
                                Domain : {myprice.specialties?.map((item, index) =>
                                    <p className='p-2 inline-block select-none text-xs border-2 m-2 rounded-md' key={index}>{item}</p>
                                )}
                            </div>
                        <button onClick={
                            handleDeletePrice
                        } className='p-2 my-2 mx-2 bg-red-500 text-white font-bold rounded-lg'>Delete</button>

                        </>

                    ) : "No Pricing Found"
                }
            </div>
        </div>
            </div>
     
    );
};

export default Pricing;
