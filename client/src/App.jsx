import './App.css'
import {BrowserRouter as Router,Routes,Route,useNavigate} from 'react-router-dom';
import Signup_Mentee from './components/SignUp_Mentee';
import Login_Mentee from './components/Login_Mentee';
import Signup_Mentor from './components/Signup_Mentor';
import Login_Mentor from './components/Login_Mentor';
import Home from './components/Home';
function App() {
  return (
    <>
<Router>
<Routes>
<Route exact path="/" element={<Signup_Mentee/>}/>
<Route exact path="/login_mentee" element={<Login_Mentee/>}/>
<Route exact path="/signup_mentee" element={<Signup_Mentee/>}/>
<Route exact path="/login_mentor" element={<Login_Mentor/>}/>
<Route exact path="/signup_mentor" element={<Signup_Mentor/>}/>
</Routes>
</Router>    
</>
  )
}

export default App
