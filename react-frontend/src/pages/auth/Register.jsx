import {Link, useNavigate} from 'react-router-dom'
import logo from "../../assets/images/bhala-logo.jpg";
import {useState} from "react";
import AuthLeftContent from "../../componentes/auth/AuthLeftContent.jsx";
function Register(props) {

    const [form, setForm] = useState({
        name:'',
        email:'',
        password:'',
        confirm_password:'',
    });
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const handleRegiserer = async (e) => {
        e.preventDefault();
        setErrors({});
        const res = await fetch('/api/auth/register', {
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
            navigate("/login");
        }

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div className="auth-wrapper">
            <AuthLeftContent image={logo}/>
            <div className="auth-content">
                <h1 className="h3 mb-3 fw-normal ">Sign up</h1>
                <p><small>Please fill in this form to create an account.</small></p>
                <form onSubmit={handleRegiserer}>
                    <div className="form-floating mt-2">
                        <input type="text"
                               className={`form-control ${errors.name ? "is-invalid" : ""}`}
                               id="name"
                               value={form.name}
                               name="name"
                               onChange={handleChange}
                        />
                        <label htmlFor="name">Name</label>
                        {errors.name && (<div className="text-danger">{errors.name[0]}</div>)}
                    </div>

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
                    <div className="form-floating mt-2">
                        <input type="password"
                               className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
                               id="confirm-password" name="confirm_password"
                               value={form.confirm_password}
                               onChange={handleChange}
                        />
                        <label htmlFor="confirm-password">Confirm Password</label>
                        {errors.confirm_password && (<div className="text-danger">{errors.confirm_password[0]}</div>)}
                    </div>
                    <button className="btn btn-primary w-100 py-2 mt-2" type="submit">Sign up</button>
                    <p className="mt-1 mb-2 text-body-secondary text-center">Already have an account?   <Link to={'/login'} className="text-info">Sign In</Link>.</p>
                </form>
            </div>

        </div>
    )
}

export default Register;