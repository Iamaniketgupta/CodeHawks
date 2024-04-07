import { Routes, Route } from 'react-router-dom';
import Signup_Mentee from './components/SignUp_Mentee';
import Login_Mentee from './components/Login_Mentee';
import Signup_Mentor from './components/Signup_Mentor';
import Login_Mentor from './components/Login_Mentor';
import HomePage from './components/Home';
import Chat from './components/Chat';
import MenteeDashboard from './components/menteeDashboard/MenteeDashboard';
import { Toaster } from 'react-hot-toast';
import EditProfile from './components/mentorDashboard/dashboardComponents/EditProfile';
import MentorDashboard from './components/mentorDashboard/MentorDashboard';
import EditMenteeProfile from './components/menteeDashboard/DashboardComponents/EditMenteeProfile';
import MenteeHome from './components/menteeDashboard/MenteeHome';
import Tasks from './components/menteeDashboard/Tasks';
import Chats from './components/menteeDashboard/Chats';
import Settings from './components/menteeDashboard/Settings';
import Subscription from './components/menteeDashboard/Subscription';

import MentorProfile from './components/ProfilePreview/MentorProfile';
import AllMentorsPage from "./components/AllMentorsPage"
import Paymentsuccess from './common/Paymentsuccess';
import PaymentFailed from './common/PaymentFailed';
import MySlots from './components/mentorDashboard/dashboardComponents/MySlots';

import AssignTask from './components/mentorDashboard/dashboardComponents/AssignTask';
import MentorAllTasks from './components/MentorAllTasks';
import MenteeAllTasks from './components/MenteeAllTasks';

import Pricing from './components/mentorDashboard/dashboardComponents/Pricing';
import Meetings from './components/mentorDashboard/dashboardComponents/Meetings';
import RoomPage from "./components/Room/RoomPage";
import MyMentees from './components/mentorDashboard/dashboardComponents/MyMentees';
import MentorCard from './common/MentorCard';
import MentorChat from './components/MentorChat';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector , useDispatch} from 'react-redux'
import { login } from './store/authSlice';
import {useNavigate} from 'react-router-dom'


function App() {

  const user = useSelector((state)=>state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true); // State for loading indicator

  

  const refresh = async()=>{
    try {
      // console.log("first")
      const response = await axios.post("/api/v1/refresh");
      // console.log("second")
      // console.log(response.data)
      const obj = {
        user:response.data.data
      }
      dispatch(login(obj))
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  }

  


  useEffect(() => {
    console.log("first")
    const menteeCookie = document.cookie.includes("accessToken");
    const mentorCoookie = document.cookie.includes("menauthId");
    // console.log(menteeCookie)
    // console.log(mentorCoookie)
    if(!user){
      if(menteeCookie){
        refresh()
      }else if(mentorCoookie){
        refresh()
      }else{
        setLoading(false)
  
      }
    }else{
      setLoading(false);
    }
  }, [user])

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>

      <Routes>

        {/* Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* Mentee Routes */}
        <Route path="mentee/dashboard/" element={<><MenteeDashboard /><MenteeHome /></>} />
        <Route path="mentee/dashboard/tasks" element={<><MenteeDashboard /><MenteeAllTasks /></>} />
        <Route path="/mentor/chat/:recipientId" element={<MentorChat />} />
        <Route path="mentee/dashboard/settings" element={<><MenteeDashboard /><EditMenteeProfile /></>} />
        <Route path="mentee/dashboard/subscription" element={<><MenteeDashboard /><Subscription /></>} />


        {/* Mentor Routes */}
        <Route path="/mentor/dashboard/:mentorName" element={<MentorDashboard />} />
        <Route path="/profile/:nameId" element={<MentorProfile />} />
        <Route path="/allMentors" element={<AllMentorsPage />} />


        {/* <Route path="mentor/dashboard/home" element={<> <MentorDashboard /><Home /></>} /> */}
        <Route path="mentor/dashboard/pricing" element={<> <MentorDashboard /><Pricing /></>} />
        <Route path="mentor/dashboard/subscribers" element={<> <MentorDashboard /><MyMentees /></>} />
        <Route path="mentor/dashboard/meetings" element={<> <MentorDashboard /><Meetings /></>} />
        <Route path="/mentor/dashboard/trailslots" element={<> <MentorDashboard /><MySlots /></>} />
        <Route path="/mentor/dashboard/tasks" element={<> <MentorDashboard /><AssignTask/></>} />
        <Route path="/mentor/dashboard/alltasks" element={<> <MentorDashboard /><MentorAllTasks/></>} />
        <Route path="/mentor/dashboard/edit/profile" element={<> <MentorDashboard /><EditProfile/></>} />

        {/* Stripe Payment response Routes */}
        <Route path="/checkout-success" element={<Paymentsuccess />} />
        <Route path="/checkout-failed/:mentorid" element={<PaymentFailed />} />



        {/* Authentication Routes  */}
        <Route path="/login_mentee" element={<Login_Mentee />} />
        <Route path="/signup_mentee" element={<Signup_Mentee />} />
        <Route path="/login_mentor" element={<Login_Mentor />} />
        <Route path="/signup_mentor" element={<Signup_Mentor />} />

        {/* Chat Routes */}
        <Route path="/mentee/chat/:recipientId" element={<Chat />} />
        {/* <Route path="/mentor/chat/:recipientId" element={<MentorChat />} /> */}
        <Route path="/room/:roomId" element={<RoomPage />} />


      </Routes>


      <Toaster />
    </>
  )
}

export default App
