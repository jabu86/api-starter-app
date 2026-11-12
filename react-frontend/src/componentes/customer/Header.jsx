
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  faCartShopping,
  faBars,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../../assets/images/bhala-logo.jpg'

function Header() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
    setDropDown(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/login");
  };

  const isActive = (route) => path === route ? "active" : "";

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">

          {/* Brand / Logo */}
          <Link className="navbar-brand" to="/" onClick={closeMenu}>
            <img src={logo}/>
          </Link>

          {/* Mobile menu button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="mainNavbar"
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>

          {/* Navigation */}
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="mainNavbar"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/")}`}
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/shop")}`}
                  to="/shop"
                  onClick={closeMenu}
                >
                  Shop
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/about")}`}
                  to="/about"
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/contact")}`}
                  to="/contact"
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Cart */}
            <ul className="navbar-nav align-items-lg-center">
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="nav-link cart-link"
                  onClick={closeMenu}
                  aria-label={`Shopping cart, ${cartCount} items`}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="cart-count">{cartCount}</span>
                  <span className="d-lg-none ms-2">Cart</span>
                </Link>
              </li>
            </ul>

            {/* Authentication */}
            {!user ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/login")}`}
                    to="/login"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/register")}`}
                    to="/register"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </li>
              </ul>
            ) : (
              <div className="dropdown account-dropdown">
                <button
                  className="account-toggle"
                  type="button"
                  onClick={() => setDropDown(!dropDown)}
                  aria-expanded={dropDown}
                >
                  {user.email}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ms-2"
                  />
                </button>

                {dropDown && (
                  <ul className="dropdown-menu show">
                    {(user.roles.includes("admin") ||
                      user.roles.includes("user")) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin"
                          onClick={closeMenu}
                        >
                          Admin
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/profile/${user.name}`}
                        onClick={closeMenu}
                      >
                        Profile
                      </Link>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
