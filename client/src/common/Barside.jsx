import { Link } from 'react-router-dom';
import './Barside.css';
import { useEffect } from 'react';
export default function Barside() {
  function giveAction() {
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".bx-menu");
    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });
  }
  useEffect(() => {
    window.addEventListener('load', giveAction);
    giveAction();
  }, []);
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div className="sidebar" onClick={giveAction}>
        <div className="logo-details">
          <i className="bx bx-menu" />
        </div>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus" />
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
                <Link className="link_name" to="/">
                  Category
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/mentee/dashboard/analytics">
              <i className="bx bx-pie-chart-alt-2" />
              <span className="link_name">Analytics</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/">
                  Analytics
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/">
              <i className="bx bx-line-chart" />
              <span className="link_name">Chart</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/">
                  Chart
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/">
                  Plugins
                </Link>
              </li>
              <li>
                <Link to="/">UI Face</Link>
              </li>
              <li>
                <Link to="/">Pigments</Link>
              </li>
              <li>
                <Link to="/">Box Icons</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/">
              <i className="bx bx-compass" />
              <span className="link_name">Explore</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/">
                  Explore
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/">
              <i className="bx bx-history" />
              <span className="link_name">History</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/">
                  History
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/">
              <i className="bx bx-cog" />
              <span className="link_name">Setting</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/">
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
                <div className="profile_name">Prem Shahi</div>
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
