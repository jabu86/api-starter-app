import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'


function Dashboard() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="main-wrapper">

                    <div className="main-header mb-1">
                        <h2>Dashboard</h2>
                    </div>

                <div className="dashboard-sub-header">
                    <div className="well">
                        <h4>Users</h4>
                        <p>1 Million</p>
                    </div>
                    <div className="well">
                        <h4>Customers</h4>
                        <p>1 Million</p>
                    </div>
                    <div className="well">
                        <h4>In Stock</h4>
                        <p>1 Million</p>
                    </div>
                    <div className="well">
                        <h4>Orders</h4>
                        <p>1 Million</p>
                    </div>
                </div>

                <div className="content">
                    <div className="well">
                        <p>Dashboard Graph!!!!</p>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Dashboard
