import { Link } from 'react-router-dom';
import './Barside.css';
import { useEffect } from 'react';
export default function Barside() {
  function giveAction() {
    let sidebar = document.querySelector(".sidebar");
    let menu=document.querySelector(".logo-details");
    let sidebarBtn = document.querySelector(".bx-menu");
    sidebarBtn.addEventListener("click", (event) => {
      sidebar.classList.toggle("close");
    });
    window.addEventListener('click', function(e){   
      if (menu.contains(e.target)){
          sidebar.classList.toggle("close");
        // Clicked in box
      } else{
            sidebar.classList.add("close");
        // Clicked outside the box
      }
    });
  
  }
  useEffect(() => {
    window.addEventListener('load', giveAction);
    giveAction();
  }, []);
  return (
    <>
    
      <div className="sidebar close" onClick={giveAction}>
        <div className="logo-details">
          <i className="bx bx-menu" />
        </div>
        <div className="logo-details">
          <i className="bx bx bx-shield-quarter" />
          <span className="logo_name">Mentor Hub</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/mentee/dashboard/">
              <i className="bx bx-grid-alt" />
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/mentee/dashboard/">
                  Dashboard
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/mentee/dashboard/tasks">
              <i className="bx bx-pie-chart-alt-2" />
              <span className="link_name">Tasks</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/mentee/dashboard/tasks">
                  Tasks
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/mentee/chat/id">
              <i className="bx bx bxs-chat" />
              <span className="link_name">Chats</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/mentee/chat/id">
                  Chats
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/mentee/dashboard/subscription">
              <i className="bx bx-compass" />
              <span className="link_name">Subscription</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/mentee/dashboard/subscription">
                  Subscription
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/mentee/dashboard/">
              <i className="bx bx-history" />
              <span className="link_name">Others</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/mentee/dashboard/">
                  Others
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/mentee/dashboard/settings">
              <i className="bx bx-cog" />
              <span className="link_name">Setting</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/mentee/dashboard/settings">
                  Setting
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                {/*<img src="image/profile.jpg" alt="profileImg">*/}
              </div>
              <div className="name-job">
                <div className="profile_name">Tirthesh Jain</div>
                <div className="job">Web Desginer</div>
              </div>
              <i className="bx bx-log-out" />
            </div>
          </li>
        </ul>
      </div>
    </>


  );
}
