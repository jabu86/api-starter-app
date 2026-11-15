import { Outlet} from 'react-router-dom'
import Header from "../componentes/customer/Header.jsx";
import Footer from '../componentes/customer/Footer.jsx';
function CustomerLayout () {

    return (
        <>
            <Header />
            <div className="main-wrapper">
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export default CustomerLayout;