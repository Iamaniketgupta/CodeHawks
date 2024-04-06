import { Link } from "react-router-dom";

const Paymentsuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-96" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Your payment was successful.</span>
            </div>
            <Link to="/mentee/dashboard" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Continue
            </Link>
        </div>
    );
}

export default Paymentsuccess;
