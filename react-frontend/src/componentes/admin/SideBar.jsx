import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faGrip,
    faKaaba,
    faLayerGroup,
    faPalette,
    faRulerCombined,
    faStore,
    faTrademark
} from "@fortawesome/free-solid-svg-icons";


function SideBar({sideBarOpen}){
    return (
        <aside className={`sidebar ${sideBarOpen?  'open' : 'close'}`}>
            <div className="user-info">
                <h2>Admin</h2>
                <p>Welcome back John Doe</p>
            </div>
            <nav className="mt-1">
                <ul>
                    <li><Link to="/admin"><FontAwesomeIcon icon={faGrip} /> Dashboard</Link></li>
                    <li><Link to="/admin/products"><FontAwesomeIcon icon={faStore}/> Products</Link></li>
                    <li><Link to="/admin/brands"><FontAwesomeIcon icon={faTrademark} /> Brand</Link></li>
                    <li><Link to="/admin/categories"><FontAwesomeIcon icon={faLayerGroup} /> Category</Link></li>
                    <li><Link to="/admin/sub-categories"><FontAwesomeIcon icon={faKaaba} /> Sub Category</Link></li>
                    <li><Link to="/admin/colors"><FontAwesomeIcon icon={faPalette} /> Colors</Link></li>
                    <li><Link to="/admin/sizes"><FontAwesomeIcon icon={faRulerCombined} /> Sizes</Link></li>
                </ul>

            </nav>
        </aside>
    )
}
export default SideBar;