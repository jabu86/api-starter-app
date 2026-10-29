import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router";

function Breadcrumb({ route1, route2, route3, page, page2 , parentPage , icon1, icon2} ) {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="row mb-2 m-0 border-bottom bg-light py-2">
            <div className="col-sm-6">
                <h1 className="mb-0 fs-3 fw-semibold">{page}</h1>
            </div>
            <div className="col-sm-6">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb float-sm-end">
                        {route1 &&<li className="breadcrumb-item"><Link to={route1}>{parentPage} <FontAwesomeIcon icon={icon1}/></Link>
                        </li>}
                        {route2 && <li className="breadcrumb-item" aria-current="page"><Link to={route2}>{page} <FontAwesomeIcon icon={icon2}/> </Link></li>}
                        {route3 && <li className="breadcrumb-item" aria-current="page"><Link to={route2}>{page2} <FontAwesomeIcon icon={icon2}/> </Link></li>}
                    </ol>
                </nav>
            </div>
        </div>
    );
}

export default Breadcrumb;
