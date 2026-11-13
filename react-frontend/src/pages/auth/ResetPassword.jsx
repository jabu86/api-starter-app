import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/bhala-logo.jpg";
import AuthLeftContent from "../../componentes/auth/AuthLeftContent.jsx";
import { API_URL } from "../../services/api";
import hero from "../../assets/images/hero.png";
function ResetPassword(props) {
  const navigate = useNavigate();
  const { token } = useParams();

  const [form, setForm] = useState({
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
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
      console.log(data);
    } catch (err) {
      console.log({ error: err });
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
            <h1>Reset password</h1>
            <p>Please fill in this form to reset your account.</p>
          </div>
          <form onSubmit={handleReset}>
            <div className="form-floating mt-2">
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                value={form.password}
                name="password"
                onChange={handleChange}
              />
              <label htmlFor="email">Password</label>
              {errors.password && (
                <div className="text-danger">{errors.password[0]}</div>
              )}
            </div>
            <div className="form-floating mt-2">
              <input
                type="password"
                className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
                id="confirm_password"
                value={form.confirm_password}
                name="confirm_password"
                onChange={handleChange}
              />
              <label htmlFor="email">Confirm Password</label>
              {errors.confirm_password && (
                <div className="text-danger">{errors.confirm_password[0]}</div>
              )}
            </div>
            <button className="btn auth-submit w-100 mt-4" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ResetPassword;
