import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faLayerGroup,
  faPalette,
  faRulerCombined,
  faStore,
  faTrademark,
  faUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router";

function SideBar({ sideBarOpen }) {
  const location = useLocation();
  const path = location.pathname;
  const { user } = useAuth();
  return (
    <aside className={`sidebar col-sm-2 ${sideBarOpen ? "open" : "close"}`}>
      <div className="user-info mt-5">
        <h2>Admin</h2>
        <p>
          Welcome back
          <br />
          {user.name}
        </p>
      </div>
      <nav className="mt-1">
        <ul className="nav nav-pills flex-column mb-auto p-1">
          <li className="nav-item">
            <Link
              to="/admin"
              className={`nav-link ${path == "/admin" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faGrip} /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/products"
              className={`nav-link ${path == "/admin/products" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faStore} /> Products
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/brands"
              className={`nav-link ${path == "/admin/brands" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faTrademark} /> Brand
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/categories"
              className={`nav-link ${path == "/admin/categories" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faLayerGroup} /> Category
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/colors"
              className={`nav-link ${path == "/admin/colors" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faPalette} /> Colors
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/sizes"
              className={`nav-link ${path == "/admin/sizes" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faRulerCombined} /> Sizes
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/orders"
              className={`nav-link ${path == "/admin/orders" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faWarehouse} /> Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/users"
              className={`nav-link ${path == "/admin/users" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faUser} /> Users
            </Link>
          </li>
          <li className="list-item"></li>
        </ul>        
      </nav>
    </aside>
  );
}

export default SideBar;
