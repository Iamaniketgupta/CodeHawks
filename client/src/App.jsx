import { Routes, Route } from 'react-router-dom';
import Signup_Mentee from './components/SignUp_Mentee';
import Login_Mentee from './components/Login_Mentee';
import Signup_Mentor from './components/Signup_Mentor';
import Login_Mentor from './components/Login_Mentor';
import Home from './components/Home';
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

import AssignTask from './components/AssignTask';
import MentorAllTasks from './components/MentorAllTasks';
import MenteeAllTasks from './components/MenteeAllTasks';

import Pricing from './components/mentorDashboard/dashboardComponents/Pricing';
import Meetings from './components/mentorDashboard/dashboardComponents/Meetings';

function App() {
  return (
    <>
      
        <Routes>

          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Main Routes */}
          <Route path="mentor/dashboard/" element={<MentorDashboard/>}/>
<Route path="mentee/dashboard/" element={<><MenteeDashboard/><MenteeHome/></>}/>
<Route path="mentee/dashboard/tasks" element={<><MenteeDashboard/><Tasks/></>}/>
<Route path="mentee/dashboard/chats" element={<><MenteeDashboard/><Chats/></>}/>
<Route path="mentee/dashboard/settings" element={<><MenteeDashboard/><Settings/></>}/>
<Route path="mentee/dashboard/subscription" element={<><MenteeDashboard/><Subscription/></>}/>
          <Route path="/profile/:nameId" element={<MentorProfile />} />
          <Route path="/allMentors" element={<AllMentorsPage />} />

          {/* Stripe Payment response Routes */}
          <Route path="/checkout-success" element={<Paymentsuccess />} />
          <Route path="/Mentor/:mentorid" element={<PaymentFailed />} />



          {/* Authentication Routes  */}
          <Route path="/login_mentee" element={<Login_Mentee />} />
          <Route path="/signup_mentee" element={<Signup_Mentee />} />
          <Route path="/login_mentor" element={<Login_Mentor />} />
          <Route path="/signup_mentor" element={<Signup_Mentor />} />

          {/* Chat Routes */}
          <Route path="/mentee/chat/:recipientId" element={<Chat />} />

          {/* Extra Temporary routes */}

          <Route path="/a" element={<MentorAllTasks />} />
          <Route path="/m" element={<AssignTask />} />

          <Route path="/editProfile" element={<EditProfile />} />



          <Route path="/m" element={<Meetings />} />



        </Routes>
     

      <Toaster />
    </>
  )
}

export default App
