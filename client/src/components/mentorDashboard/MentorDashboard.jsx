import { Link } from "react-router-dom";
import MySlots from "./dashboardComponents/MySlots"
const MentorDashboard = () => {
    return (
        <div>
       Mentor Dashboard

       <div>
        <Link to={"/editProfile"} >Edit profile</Link>
        <Link to={"/pricing"} >Pricing</Link>
        <Link to={"/slots"} >My Slots</Link>
        <Link to={"/mentordashboard/home"} >Home</Link>
       </div>
        </div>
    );
}

export default MentorDashboard;
