import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react";
import logo from  '../../assets/images/bhala-logo.jpg'
import AuthLeftContent from "../../componentes/auth/AuthLeftContent.jsx";
function Forgot(props) {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email:'',

    })

    const handleForgot = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
        const data = await res.json();
        console.log(data);

    }

    const handleChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value });
    }


    return (
        <div className="auth-wrapper">
            <AuthLeftContent image={logo}/>
            <div className="auth-content">
                <h1 className="h3 mb-3 fw-normal ">Forgot password</h1>
                <p><small>Please fill in this form to reset your account.</small></p>
                <form onSubmit={handleForgot}>
                    <div className="form-floating mt-2">
                        <input type="email"
                               className="form-control"
                               id="email"
                               value={form.email}
                               name="email"
                               onChange={handleChange}
                        />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2 mt-2" type="submit">Sign in</button>
                    <p className="mt-1 mb-2 text-body-secondary text-center">Already have an account? <Link className="text-info" to="/login">Sign in</Link>.</p>
                    <p className="mt-1 mb-2 text-body-secondary text-center">Don't have an account? <Link to={'/register'} className="text-info">Sign up</Link>.</p>
                </form>
            </div>

        </div>
    )
}

export default Forgot;