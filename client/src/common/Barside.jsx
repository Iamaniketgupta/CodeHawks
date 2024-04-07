import { Link, NavLink } from 'react-router-dom';
import './Barside.css';
import { useEffect } from 'react';
export default function Barside() {
  function giveAction() {
    let sidebar = document.querySelector(".sidebar");
    let menu = document.querySelector(".logo-details");
    let sidebarBtn = document.querySelector(".bx-menu");
    sidebarBtn.addEventListener("click", (event) => {
      sidebar.classList.toggle("close");
    });
    window.addEventListener('click', function (e) {
      if (menu.contains(e.target)) {
        sidebar.classList.toggle("close");
        // Clicked in box
      } else {
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

      <div className="sidebar close cursor-pointer" onClick={giveAction}>
        <div className="logo-details">
          <i className="bx bx-menu" />
        </div>
        <div className="logo-details">
          <span className="ml-7 logo_name">Mentor Hub</span>
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
            <Link to="/mentee/dashboard/allMentors"
              className=' text-center my-2 flex mx-auto items-center '>
              <svg
                className="flex-shrink-0 ml-7 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 1.4.267 6.39 6.439 0 0 1-1.331 6.638A4 4 0 1 0 1 2Zm1 9h-.2646.957 6.957 0 0 1 15 1a7 2.7 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <p className='ml-7  link_name'>Buy Mentorship</p>
            </Link>

            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/mentee/dashboard/allMentors">
                 Buy Mentorship
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/mentee/dashboard/meetings"
              className=' text-center my-2 flex mx-auto items-center '>
              <svg
                className="flex-shrink-0 ml-7 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <p className='ml-7  link_name'>Meetings</p>
            </Link>

            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/mentee/dashboard/meetings">
                  Meetings
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
      </div >
    </>


  );
}
