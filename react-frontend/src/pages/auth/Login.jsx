import {useNavigate} from 'react-router-dom'
function Login(props) {

    const navigate = useNavigate();


    const login = () => {
        localStorage.setItem("admin", true);
        navigate("/admin");
    }

    return (
        <div className="row mt-5">
            <div className="col-md-6">
                <h1 className="h3 mb-3 fw-normal text-center">Welcome Back</h1>
                <h2 className="h3 mb-3 fw-normal">Please sign in</h2>

            </div>
            <div className="col-md-6">
                <form>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com"/>
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Password" name="password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" name="remember-me" value="remember-me" id="checkDefault"/>
                        <label className="form-check-label" htmlFor="checkDefault">Remember me</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-body-secondary">© 2017–2025</p>
                </form>
            </div>

        </div>
    )
}

export default Login;