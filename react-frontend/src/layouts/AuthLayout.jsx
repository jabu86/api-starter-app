import {Link, Outlet} from 'react-router-dom'


function AuthLayout () {

    return (
        <>

            <main className="d-flex align-items-center justify-content-center py-4 bg-body-tertiary" style={{height: '100vh'}}>
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout;