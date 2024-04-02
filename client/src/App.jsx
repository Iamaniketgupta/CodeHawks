import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Signup_Mentee from './components/SignUp_Mentee';
import Login_Mentee from './components/Login_Mentee';
import Signup_Mentor from './components/Signup_Mentor';
import Login_Mentor from './components/Login_Mentor';
import Home from './components/Home';
import MentorDashboard from './components/mentorDashboard/MentorDashboard';
import MenteeDashboard from './components/menteeDashboard/MenteeDashboard';
import MySlots from './components/mentorDashboard/dashboardComponents/MySlots';
import { Toaster } from 'react-hot-toast';
import MenteeHome from './components/menteeDashboard/MenteeHome';
import Analytics from './common/Analytics';
function App() {
  return (
    <>
<Router>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="login_mentee" element={<Login_Mentee/>}/>
<Route path="signup_mentee" element={<Signup_Mentee/>}/>
<Route path="login_mentor" element={<Login_Mentor/>}/>
<Route path="signup_mentor" element={<Signup_Mentor/>}/>
<Route path="mentor/dashboard/" element={<MentorDashboard/>}/>
<Route path="mentee/dashboard/" element={<><MenteeDashboard/><MenteeHome/></>}/>
<Route path="mentee/dashboard/analytics" element={<><MenteeDashboard/><Analytics/></>}/>
<Route path="/a" element={<MySlots/>}/>
</Routes>
</Router>
<Toaster />
</>
  )
}

export default App
