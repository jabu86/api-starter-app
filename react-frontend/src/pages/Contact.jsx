import { useState } from "react";
import ContactForm from '../componentes/customer/ContactForm';
import logo from '../assets/images/slidertwo.png'
function Contact() {
  
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center p-2 bg-primary py-5">
          <h1 className="display-4">Get in Touch</h1>
          <p className="text-light">
            We love our customers. Feel free to contact us at any time. We are
            available via email, live chat, or phone.
          </p>
        </div>
      </div>
      <div className="row contact-info">
        <div className="col-md-6">
          <h1 className="display-5 mb-4 text-center">Come & Say Hi</h1>
          <div className="row">
            <div className="col">
              <p className="text-center">4620 Ivory Park, Sibiya street, Ext 6</p>
              <p className="text-center">Midrand, 1685</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <img src={logo} alt="bhala logo" width={500} height={500} />
        </div>
      </div>
      <ContactForm/>
    </>
  );
}

export default Contact;
