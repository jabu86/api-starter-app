// import {Link, useNavigate} from "react-router-dom";
// import {useAuth} from "../../context/AuthContext.jsx";
import { useState, useEffect } from "react";

function ProfileResetPassword({ onSubmit, user , errors }) {


  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id || "",
      });
    }
  }, [user]);

  const handleUpdateUserPassword = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="col-md-6">
          <form onSubmit={handleUpdateUserPassword}>
            <h2>Reset Password</h2>
            <div className="form-group mb-2">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                 onChange={handleChange}
              />
              {errors.password && (<div className="text-danger">{errors.password[0]}</div>)}
            </div>
            <div className="form-group mb-2">
              <label htmlFor="confirm-password">``
                <strong>Confim-Password</strong>
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                 onChange={handleChange}
              />
              {errors.confirmPassword && (<div className="text-danger">{errors.confirmPassword[0]}</div>)}
            </div>

            <div>
              <button type="submit" className="btn btn-primary btn-lg mt-2">
                Reset Password
              </button>
            </div>
          </form>
        </div>
  );
}

export default ProfileResetPassword;
