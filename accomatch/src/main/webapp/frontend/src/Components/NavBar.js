import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const userid=sessionStorage.getItem('user_id');
  const handleClick = () => setClick(!click);
  const userType = sessionStorage.getItem('type');

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            AccoMatch 
            <i className="fas fa-home"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/posts"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Posts
              </NavLink>
            </li>
          
            {userType === 'LH' && (
            <li className="nav-item">
              <NavLink
                exact
                to={"/personalposts/"+userid}
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Personal Posts
              </NavLink>
            </li>
            )}
            <li className="nav-item">
              <NavLink
                  exact
                  to="/allapplicant"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
              >
                All Applicants
              </NavLink>
            </li>
            {userType === 'LH' && (
            <li className="nav-item">
              <NavLink
                exact
                to="/create"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Create Posts
              </NavLink>
            </li>
            )}
            {userType === 'AP' && (
            <li className="nav-item">
              <NavLink
                exact
                to="/createApplicant"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Create Ad
              </NavLink>
            </li>
            )}
            
            {/* Show the Admin portal link for user type 'AD' */}
            {userType === 'AD' && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/postsbystatus"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Admin portal
                </NavLink>
              </li>
            )}
              <li className="nav-item">
              <NavLink
                  exact
                  to={"/userprofile/"+userid}
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
              >
                User Profile
              </NavLink>
            </li>

          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
