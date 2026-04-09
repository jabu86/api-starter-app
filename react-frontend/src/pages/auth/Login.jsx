import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from "../../context/AuthContext.jsx";
import {useState} from "react";
import logo from  '../../assets/images/bhala-logo.jpg'
import AuthLeftContent from "../../componentes/auth/AuthLeftContent.jsx";
function Login(props) {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email:'',
        password:'',
    })
    const [errors, setErrors] = useState({})

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if(res.status === 400 && data.errors){
                const groupedErrors = data.errors.reduce((acc, err) =>{
                    if(!acc[err.path]){
                        acc[err.path] = [];
                    }
                    acc[err.path].push(err.msg);
                    return acc;
                },{})
                setErrors(groupedErrors || {});
                return;
            }

            if(data.success === true){
               login(data.token);
                navigate("/");
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div className="auth-wrapper">
            <AuthLeftContent image={logo}/>
            <div className="auth-content">
                <h1 className="h3 mb-3 fw-normal ">Sign in</h1>
                <p><small> Please fill in this form to create an account.</small></p>
                <form onSubmit={handleLogin}>
                    <div className="form-floating mt-2">
                        <input type="email"
                               className={`form-control ${errors.email ? "is-invalid" : ""}`}
                               id="email"
                               value={form.email}
                               name="email"
                               onChange={handleChange}
                        />
                        <label htmlFor="email">Email address</label>
                        {errors.email && (<div className="text-danger">{errors.email[0]}</div>)}
                    </div>
                    <div className="form-floating mt-2">
                        <input type="password"
                               className={`form-control ${errors.password ? "is-invalid" : ""}`}
                               id="password" name="password"
                               value={form.password}
                               onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                        {errors.password && (<div className="text-danger">{errors.password[0]}</div>)}
                    </div>
                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" name="remember-me" value="remember-me"
                               id="checkDefault"/>
                        <label className="form-check-label" htmlFor="checkDefault">Remember me</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                    <p className="mt-1 mb-2 text-body-secondary text-center">Don't have an account?  <Link to={'/register'} className="text-info">Sign up</Link>.</p>
                    <p className="mt-1 mb-2 text-body-secondary text-center">Forgot password?  <Link to={'/forgot-password'} className="text-info">Reset</Link>.</p>
                </form>
            </div>
        </div>
    )
}

export default Login;