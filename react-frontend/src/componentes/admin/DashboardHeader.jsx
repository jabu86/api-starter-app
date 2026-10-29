import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBasketShopping, faCashRegister,
} from "@fortawesome/free-solid-svg-icons";

import {faBuysellads, faProductHunt} from "@fortawesome/free-brands-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import CountUp from "./CountUp";
function DashboardHeader( {orderCount, salesCount,customerCount, inStockCount,} ) {


    return (
        <div className="row p-2">
            <div className="col-lg-3 col-6">
                <div className="small-box text-bg-primary p-2">
                    <div className="inner">
                        <FontAwesomeIcon icon={faBasketShopping} className="float-end" size="6x" />
                        <h3><CountUp value={orderCount}/></h3>
                        <p>New Orders</p>
                    </div>
                    <Link to="/admin/orders"
                          className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
                        More info <i className="bi bi-link-45deg"></i>
                    </Link>
                </div>
            </div>
            <div className="col-lg-3 col-6">
                <div className="small-box text-bg-info  p-2">
                    <div className="inner">
                        <FontAwesomeIcon icon={faCashRegister} className="float-end" size="6x" />
                        <h3><CountUp value={salesCount}/></h3>
                        <p>Sale's</p>
                    </div>
                    <Link to="/admin/users"
                          className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
                        More info <i className="bi bi-link-45deg"></i>
                    </Link>
                </div>
            </div>
            <div className="col-lg-3 col-6">
                <div className="small-box text-bg-warning p-2">
                    <div className="inner">
                        <FontAwesomeIcon icon={faUsers} className="float-end" size="6x" />
                        <h3><CountUp value={customerCount}/></h3>
                        <p>Customer's</p>
                    </div>
                    <Link to="/admin/orders"
                          className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
                        More info <i className="bi bi-link-45deg"></i>
                    </Link>
                </div>
            </div>
            <div className="col-lg-3 col-6">
                <div className="small-box text-bg-danger p-2">
                    <div className="inner">
                        <FontAwesomeIcon icon={faProductHunt} className="float-end" size="6x" />
                        <h3><CountUp value={inStockCount}/></h3>
                        <p>In Stock</p>
                    </div>
                    <Link to="/admin/products"
                          className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
                        More info <i className="bi bi-link-45deg"></i>
                    </Link>
                </div>
            </div>

        </div>

    );
}

export default DashboardHeader;
