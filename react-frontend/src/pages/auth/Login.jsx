
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import logo from "../../assets/images/bhala-logo.jpg";
import AuthLeftContent from "../../componentes/auth/AuthLeftContent.jsx";
import { API_URL } from "../../services/api";
import hero from "../../assets/images/hero.png";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 400 && data.errors) {
        const groupedErrors = data.errors.reduce((acc, err) => {
          if (!acc[err.path]) acc[err.path] = [];
          acc[err.path].push(err.msg);
          return acc;
        }, {});

        setErrors(groupedErrors);
        return;
      }

      if (data.success === true) {
        login(data.token);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const content = [
    "Shop all you can.",
    "A one stop shop for all your needs.",
  ];

   useEffect(() => {
      document.title = `Bhala| SignIn`;
  
    })
  
  return (
    <main className="auth-wrapper">
      {/* Left branding panel */}
      <section
        className="auth-visual"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.8)), url(${hero})`,
        }}
      >
        <AuthLeftContent
          image={logo}
          heading="Welcome Back"
          content={content}
        />
      </section>

      {/* Login form */}
      <section className="auth-content">
        <div className="auth-form-container">
          <div className="auth-heading">
            <h1>Sign in</h1>
            <p>Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
              <label htmlFor="email">Email address</label>

              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email[0]}
                </div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <label htmlFor="password">Password</label>

              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password[0]}
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </div>

            <button className="btn auth-submit w-100" type="submit">
              Sign in
            </button>

            <p className="auth-footer">
              Don't have an account?
              <Link to="/register" className="auth-link ms-1">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
