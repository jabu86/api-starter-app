import {Link, useNavigate, useParams} from 'react-router-dom'
import {useState} from "react";
import logo from  '../../assets/images/bhala-logo.jpg'
import AuthLeftContent from "../../componentes/auth/AuthLeftContent.jsx";
function ResetPassword(props) {

    const navigate = useNavigate();
    const {token} =useParams();

    console.log(token ,'token');
    const [form, setForm] = useState({
        password:'',
        confirm_password:'',
    })
    const [errors, setErrors] = useState({})

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();
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
            console.log(data);
        }catch(err) {
            console.log({error:err});
        }

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    return (
        <div className="auth-wrapper">
            <AuthLeftContent image={logo}/>
            <div className="auth-content">
                <h1 className="h3 mb-3 fw-normal ">Reset password</h1>
                <p><small>Please fill in this form to reset your account.</small></p>
                <form onSubmit={handleReset}>
                    <div className="form-floating mt-2">
                        <input type="password"
                               className={`form-control ${errors.password ? "is-invalid" : ""}`}
                               id="password"
                               value={form.password}
                               name="password"
                               onChange={handleChange}
                        />
                        <label htmlFor="email">Password</label>
                        {errors.password && (<div className="text-danger">{errors.password[0]}</div>)}
                    </div>
                    <div className="form-floating mt-2">
                        <input type="password"
                               className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
                               id="confirm_password"
                               value={form.confirm_password}
                               name="confirm_password"
                               onChange={handleChange}
                        />
                        <label htmlFor="email">Confirm Password</label>
                        {errors.confirm_password && (<div className="text-danger">{errors.confirm_password[0]}</div>)}
                    </div>
                    <button className="btn btn-primary w-100 py-2 mt-2" type="submit">Reset Password</button>

                </form>
            </div>

        </div>
    )
}

export default ResetPassword;