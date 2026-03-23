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
        <aside className={`sidebar col-sm-2 ${sideBarOpen?  'open' : 'close'}`}>
            <div className="user-info mt-5">
                <h2>Admin</h2>
                <p>Welcome back John Doe</p>
            </div>
            <nav className="mt-1">

                    <><Link to="/admin"><FontAwesomeIcon icon={faGrip} /> Dashboard</Link></>
                    <><Link to="/admin/products"><FontAwesomeIcon icon={faStore}/> Products</Link></>
                    <><Link to="/admin/brands"><FontAwesomeIcon icon={faTrademark} /> Brand</Link></>
                    <><Link to="/admin/categories"><FontAwesomeIcon icon={faLayerGroup} /> Category</Link></>
                    <li><Link to="/admin/sub-categories"><FontAwesomeIcon icon={faKaaba} /> Sub Category</Link></li>
                    <><Link to="/admin/colors"><FontAwesomeIcon icon={faPalette} /> Colors</Link></>
                    <><Link to="/admin/sizes"><FontAwesomeIcon icon={faRulerCombined} /> Sizes</Link></>


            </nav>
        </aside>
    )
}

export default SideBar;