
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/bhala-logo.jpg";
import hero from "../../assets/images/hero.png";
import { useState } from "react";
import AuthLeftContent from "../../componentes/auth/AuthLeftContent.jsx";
import { API_URL } from "../../services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegiserer = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
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
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const content = [
    "Shop all you can",
    "A one stop shop for all your needs.",
  ];

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
          heading="Join Bhala"
          content={content}
        />
      </section>

      {/* Registration form */}
      <section className="auth-content">
        <div className="auth-form-container">

          <div className="auth-heading">
            <h1>Sign up</h1>
            <p>Create an account to start shopping with us.</p>
          </div>

          <form onSubmit={handleRegiserer}>

            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
              <label htmlFor="name">Name</label>

              {errors.name && (
                <div className="invalid-feedback">
                  {errors.name[0]}
                </div>
              )}
            </div>

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
                autoComplete="new-password"
                required
              />
              <label htmlFor="password">Password</label>

              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password[0]}
                </div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
                id="confirm-password"
                name="confirm_password"
                placeholder="Confirm password"
                value={form.confirm_password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              {errors.confirm_password && (
                <div className="invalid-feedback">
                  {errors.confirm_password[0]}
                </div>
              )}
            </div>

            <button className="btn auth-submit w-100" type="submit">
              Create account
            </button>

            <p className="auth-footer">
              Already have an account?
              <Link to="/login" className="auth-link ms-1">
                Sign in
              </Link>
            </p>

            <p className="auth-footer mt-2">
              Forgot password?
              <Link to="/forgot-password" className="auth-link ms-1">
                Reset
              </Link>
            </p>

          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
