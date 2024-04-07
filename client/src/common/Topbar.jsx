import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-hot-toast";

export default function Topbar() {

    const user = useSelector((state) => state.auth.user);
   
    const state = user;
    const fullname = user?.fullName;
    const mentorName = fullname?.replace(" ", "-").toLowerCase();
    
    const [User,setUser]=useState(user);
    // console.log(user);  

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    async function signoutuser() {
        try {
            if (!confirm("Are you Sure ?"))
                return;
            await axios.get("/mentor/logout");
            navigate('/');
            toast.success("SignOut Success");
           setUser(null);
        } catch (error) {
            toast.error("Failed to Signout");
        }
    }
  return (
<>
<Navbar fluid rounded className="fixed w-full top-0 left-0 z-10">
      <Navbar.Brand href="/">
        <img src="https://flowbite-react.com/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">Mentor Hub</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
      { User &&  <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={User.avatar} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{User.fullName?.toUpperCase()}</span>
            <span className="block truncate text-sm font-medium">{User.email}</span>
          </Dropdown.Header>
          <Link to={(User?.isMentor==='0')?`/mentee/dashboard`:`/mentor/dashboard/${mentorName}`}>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          </Link>
          <Dropdown.Item onClick={signoutuser}>Sign out</Dropdown.Item>
        </Dropdown>
}
{ !User &&  <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="" rounded />
          }
        >
          <Link to="/login_mentee">
          <Dropdown.Item>Login as Mentee</Dropdown.Item>
          </Link>
          <Link to="/login_mentor">
          <Dropdown.Item>Login as Mentor</Dropdown.Item>
          </Link>
        </Dropdown>
}

        <Navbar.Toggle />
      </div>

<Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#about" className="lg:text-xl">About</Navbar.Link>
        <Navbar.Link href="#reviews" className="lg:text-xl">Reviews</Navbar.Link>
        <Navbar.Link href="#faqs" className="lg:text-xl">FAQ's</Navbar.Link>
        <Navbar.Link href="#categories" className="lg:text-xl">Categories</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
</>

  )
}
