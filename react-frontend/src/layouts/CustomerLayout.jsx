import { Outlet} from 'react-router-dom'
import Header from "../componentes/customer/Header.jsx";
function CustomerLayout () {

    return (
        <>
            <Header />
            <main className="container">
                <Outlet/>
            </main>
        </>
    )
}

export default CustomerLayout;