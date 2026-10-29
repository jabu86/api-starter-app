import {useEffect, useState} from 'react'


 import Breadcrumb from '../../componentes/admin/Breadcrumb.jsx'

import DashboardHeader from "../../componentes/admin/DashboardHeader.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import {
    faDashboard,
    faHome,

} from "@fortawesome/free-solid-svg-icons";
function Dashboard() {
    const navigate = useNavigate();
    const [orderCount, setOrderCount] = useState(0)
    const [salesCount, setSalesCount] = useState(0)
    const [customerCount, setCustomerCount] = useState(0)
    const [inStockCount, setInStockCount] = useState(0)

    const getDashboard = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            const res = await fetch(`/api/admin/dashboard`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (data.success) {

                setInStockCount(data.productQytTotal)
                setOrderCount(data.ordersCount)
                setSalesCount(data.salesCount)
                setCustomerCount(data.customerCount)
            }
        } catch (error) {
            console.log(error);

            if(error.response.status === 401 && error.response){
                toast.error(error.response.data.message);
            }
        }
    };

    useEffect(() => {

        getDashboard();
    })

    return (
        <>
        <Breadcrumb route1={'/'} route2={'/admin'} parentPage={'Home'} page={'Dashboard'} icon1={faHome} icon2={faDashboard} />
        {/*  dashboard  */}

        <DashboardHeader orderCount={orderCount} salesCount={salesCount}  customerCount={customerCount} inStockCount={inStockCount}/>
        </>
    )
}

export default Dashboard
