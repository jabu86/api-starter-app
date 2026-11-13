import React from "react";
import hero from "../../assets/images/hero.png";

function ContactForm() {
  return (
    <div className="row mb-5 g-3">
      <div className="auth-wrapper">
        <section
          className="auth-visual"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.8)), url(${hero})`,
          }}
        >
          <h2>Get in touch</h2>
        </section>
        {/* <div className="col-md-6 border">GET IN TOUCH IMAGE</div> */}
        <section className="auth-content">
          <div className="auth-form-container">
            <div className="auth-heading">
              <h1>Contact Us</h1>
              <p>Please fill in this form to get in touch.</p>
            </div>
            <form>
              <div className="form-floating mt-2 mb-4">
                <label htmlFor="name">
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-floating mt-2 mb-4">
                <label htmlFor="email">
                  <strong>E-mail</strong>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="name@example.com"
                />
              </div>
              <div className="form-floating mt-2 mb-4">
                <label htmlFor="comment">
                  <strong>Comment</strong>
                </label>
                <textarea
                  className="form-control"
                  name="comment"
                  id="comment"
                  placeholder="Enter Comment"
                  cols={10}
                ></textarea>
              </div>
              <div className="form-floating mt-2 mb-4">
                <button type="submit" className="btn auth-submit w-100 float-end">
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
