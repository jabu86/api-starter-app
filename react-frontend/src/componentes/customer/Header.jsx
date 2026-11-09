import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

function Header() {
  const { user, logout } = useAuth();
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  
  

  return (
    <header className="header navbar navbar-expand-lg navbar-light">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${path == "/" ? "active" : ""}`} to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${path == "/shop" ? "active" : ""}`} to="/shop">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${path == "/about" ? "active" : ""}`} to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${path == "/contact" ? "active" : ""}`} to="/contact">
              Contact
            </Link>
          </li>
            </ul>
            {!user ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${path == "/login" ? "active" : ""}`} to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${path == "/register" ? "active" : ""}`} to="/register">
                Register
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="dropdown">
            <li className="nav-item">
              <span onClick={handleDropDown}>{user.name}</span>
            </li>
            <div className="dropdown-item">
              {dropDown && (
                <>
                  {(user.roles.includes("admin") ||
                    user.roles.includes("user")) && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin" >
                        Admin
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className={`nav-link ${path == `/profile/${user.name}` ? "active" : ""}`} to={`/profile/${user.name}`}>
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
