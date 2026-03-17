import {useNavigate} from 'react-router-dom'
function Login(props) {

    const navigate = useNavigate();


    const login = () => {
        localStorage.setItem("admin", true);
        navigate("/admin");
    }

    return (
        <div>
            <h1>Admin Login</h1>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login;