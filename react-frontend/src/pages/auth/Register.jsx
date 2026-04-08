import {useNavigate} from 'react-router-dom'
function Register(props) {

    const navigate = useNavigate();


    const register = () => {
        localStorage.setItem("admin", true);
        navigate("/admin");
    }

    return (
        <div>
            <h1>Register</h1>
            <button onClick={register} className="btn btn-primary">Login</button>
        </div>
    )
}

export default Register;