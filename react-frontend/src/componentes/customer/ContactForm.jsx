import React, { useState } from "react";
import hero from "../../assets/images/hero.png";
import { toast } from "react-toastify";
import { API_URL } from "../../services/api";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch(`${API_URL}/api/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);

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

      if (res.status === 404) {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
      }

      if (data.success) {
        setErrors({});
        setForm({
          name: "",
          email: "",
          message: "",
        });
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        console.log(data);
      }
    } catch (err) {
      if (err.response.data.status === 500) {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className="row mb-5 g-3">
      <div className="auth-wrapper">
        <section
          className="auth-visual"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.8)), url(${hero})`,
          }}
        >
          <ul className="list-group-item p-4">
            <li className="list-item">
              <h1>Get in touch</h1>
            </li>
            <li className="list-item">
              <div className="row">
                <div className="col-md-3">
                  <p>Phone:</p>
                </div>
                <div className="col-md-9">
                  <p>063-358-3621</p>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="row">
                <div className="col-md-3">
                  <p>Email:</p>
                </div>
                <div className="col-md-9">
                  <p>jabumadela86@gmail.com</p>
                </div>
              </div>
            </li>
            <li className="list-item">
              <p>Monday - Friday 9:00am - 7:00pm EST</p>
            </li>
          </ul>
        </section>
        <section className="auth-content">
          <div className="auth-form-container">
            <div className="auth-heading">
              <h1>Contact Us</h1>
              <p>Please fill in this form to get in touch.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mt-2 mb-4">
                <label htmlFor="name">
                  <strong>
                    Name<span className="text-danger">*</span>
                  </strong>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  id="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Enter name"
                  onChange={handleChange}
                  
                />
                {errors?.name && (
                  <div className="text-danger">{errors?.name[0]}</div>
                )}
              </div>
              <div className="form-floating mt-2 mb-4">
                <label htmlFor="email">
                  <strong>
                    E-mail<span className="text-danger">*</span>
                  </strong>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors?.email && (
                  <div className="text-danger">{errors?.email[0]}</div>
                )}
              </div>
              <div className="form-floating mt-2 mb-4">
                <label htmlFor="comment">
                  <strong>
                    Message<span className="text-danger">*</span>
                  </strong>
                </label>
                <textarea
                  className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  name="message"
                  id="message"
                  value={form.message}
                  placeholder="Write a message"
                  onChange={handleChange}
                ></textarea>
                {errors?.message && (
                  <div className="text-danger">{errors?.message[0]}</div>
                )}
              </div>
              <div className="form-floating mt-2 mb-4">
                <button
                  type="submit"
                  className="btn auth-submit w-100 float-end"
                >
                  GET IN TOUCH
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactForm;
