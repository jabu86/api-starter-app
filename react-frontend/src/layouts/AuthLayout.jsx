import {Outlet} from 'react-router-dom';

import Header from '../componentes/admin/Header.jsx'
import SideBar from "../componentes/admin/SideBar.jsx";
import  Footer from "../componentes/admin/Footer.jsx"

function AdminLayout({handleSideBarClick, sideBarOpen}) {


    return (
        <div className="container-fluid">

                <div className="row g-0">
                    <SideBar sideBarOpen={sideBarOpen}/>
                    <main  className="content col-sm-10" >
                        <Header handleSideBarClick={handleSideBarClick}/>
                        <Outlet />
                        <Footer />
                    </main>
                </div>


        </div>
    )
}
export default AdminLayout;