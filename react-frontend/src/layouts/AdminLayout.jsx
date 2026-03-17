import {Outlet} from 'react-router-dom';

import Header from '../componentes/admin/Header.jsx'
import SideBar from "../componentes/admin/SideBar.jsx";
import  Footer from "../componentes/admin/Footer.jsx"

function AdminLayout({handleSideBarClick, sideBarOpen}) {


    return (
        <div className="container">
            <div className="row">
                <SideBar sideBarOpen={sideBarOpen}/>
                <main  style={{ flex:1}} >
                    <Header handleSideBarClick={handleSideBarClick}/>
                    <Outlet />
                    <Footer />
                </main>
            </div>

        </div>
    )
}
export default AdminLayout;