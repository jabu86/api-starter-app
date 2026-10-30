import {useEffect, useState} from 'react'


 import Breadcrumb from '../../componentes/admin/Breadcrumb.jsx'

import DashboardHeader from "../../componentes/admin/DashboardHeader.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {
    faDashboard,
    faHome,
} from "@fortawesome/free-solid-svg-icons"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const navigate = useNavigate();
    const [orderCount, setOrderCount] = useState(0)
    const [salesCount, setSalesCount] = useState(0)
    const [customerCount, setCustomerCount] = useState(0)
    const [inStockCount, setInStockCount] = useState(0)
    const [monthlySales, setMonthlySales] = useState([]);

    const [chartData, setChartData] = useState({
        labels: ["Customers", "Orders", "Sales", "Stock Quantity"],
        datasets: [
            {
                label: "Dashboard Statistics",
                data: [0, 0, 0, 0],
                backgroundColor: [
                    "#36A2EB",
                    "#FF6384",
                    "#FFCE56",
                    "#4BC0C0",
                ],
            },
        ],
    });

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

                setChartData({
                    labels: ["Customers", "Orders", "Sales", "Stock Quantity"],
                    datasets: [
                        {
                            label: "Dashboard Review",
                            data: [
                                data.customerCount,
                                data.ordersCount,
                                data.salesCount,
                                data.productQytTotal,
                            ],
                            backgroundColor: [
                                "#36A2EB",
                                "#FF6384",
                                "#FFCE56",
                                "#4BC0C0",
                            ],
                        },
                    ],
                });
                setMonthlySales(data.monthlySales || []);

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

    const monthlyChartData = {
        labels: monthlySales.map((item) => {
            const date = new Date(`${item.month}-01T00:00:00`);
            return date.toLocaleString("en-ZA", { month: "long" });
        }),

        datasets: [
            {
                label: "Monthly Sales Revenue",
                data: monthlySales.map((item) => item.revenue),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1,
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Overall Review',
            },
        },
    };
    const monthlyOptions = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: `Monthly Sales Revenue (${new Date().getFullYear()})`,
            },
            tooltip: {
                callbacks: {
                    label: (context) =>
                        `Revenue: ${new Intl.NumberFormat("en-ZA", {
                            style: "currency",
                            currency: "ZAR",
                        }).format(context.parsed.y)}`,
                },
            },
        },

        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) =>
                        new Intl.NumberFormat("en-ZA", {
                            style: "currency",
                            currency: "ZAR",
                            maximumFractionDigits: 0,
                        }).format(value),
                },
            },
        },
    };

    return (
        <>
        <Breadcrumb route1={'/'} route2={'/admin'} parentPage={'Home'} page={'Dashboard'} icon1={faHome} icon2={faDashboard} />
        {/*  dashboard  */}

        <DashboardHeader orderCount={orderCount} salesCount={salesCount}  customerCount={customerCount} inStockCount={inStockCount}/>

            <div className="row">
                <div className="col-md-6">

                    <Bar
                        options={options}
                        data={chartData}
                    />
                </div>
                <div className="col-md-6">

                    <Bar
                        options={monthlyOptions}
                        data={monthlyChartData}
                    />
                </div>

            </div>
        </>
    )
}

export default Dashboard
