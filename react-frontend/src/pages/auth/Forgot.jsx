import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/bhala-logo.jpg";
import AuthLeftContent from "../../componentes/auth/AuthLeftContent.jsx";
import { API_URL } from "../../services/api";
import hero from "../../assets/images/hero.png";
function Forgot(props) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleForgot = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 400 && data.errors) {
        const groupedErrors = data.errors.reduce((acc, err) => {
          if (!acc[err.path]) {
            acc[err.path] = [];
          }
          acc[err.path].push(err.msg);
          return acc;
        }, {});
        setErrors(groupedErrors || {});
        return;
      }

      if (data.success === true) {
        console.log(data);
        navigate(`/reset-password/${data.token}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const content = ["Shop all you can", "A one stop shop for all your needs."];

  return (
    <div className="auth-wrapper">
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
      <section className="auth-content">
        <div className="auth-form-container">
          <div className="auth-heading">
            <h1>Forgot password</h1>
            <p>Please fill in this form to reset your account.</p>
          </div>
          <form onSubmit={handleForgot}>
            <div className="form-floating mt-2 mb-4">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                value={form.email}
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
                autoComplete="email"
                required
              />
              <label htmlFor="email">Email address</label>
              {errors.email && (
                <div className="invalid-feedback">{errors.email[0]}</div>
              )}
            </div>
            <button className="btn auth-submit w-100" type="submit">
              Reset Password
            </button>
            <div className="d-flex justify-content-between align-items-center">
              <p className="auth-footer">
                Already have an account?{" "}
                <Link className="text-info" to="/login">
                  Sign in
                </Link>
              </p>
              <p className="auth-footer">
                Don't have an account?{" "}
                <Link to={"/register"} className="text-info">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Forgot;
