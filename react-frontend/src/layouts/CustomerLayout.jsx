import { Outlet} from 'react-router-dom'
import Header from "../componentes/customer/Header.jsx";
function CustomerLayout () {

    return (
        <>
            <Header />
            <div className="main-wrapper">
                <Outlet/>
            </div>
        </>
    )
}

export default CustomerLayout;