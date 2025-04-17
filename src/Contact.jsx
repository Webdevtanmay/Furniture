import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('http://localhost:5000/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Invalid JSON response from server');
      }

      alert(data.message || data.error);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error details:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h2 className="section-title mb-3">Get In Touch</h2>
            <p className="mb-4">
              Have questions about our products or services? We're here to help! 
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label className="text-black" htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label className="text-black" htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="text-black" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-black" htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="7"
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>

          <div className="col-lg-5 ml-auto">
            <div className="info">
              <h2 className="section-title mb-3">Contact Information</h2>
              <p className="mb-4">
                You can also reach us through the following channels:
              </p>

              <ul className="list-unstyled">
                <li className="mb-3">
                  <strong className="d-block mb-1">Address:</strong>
                  <span>123 Furniture Street, Design District, City</span>
                </li>
                <li className="mb-3">
                  <strong className="d-block mb-1">Phone:</strong>
                  <span>+1 234 567 8900</span>
                </li>
                <li className="mb-3">
                  <strong className="d-block mb-1">Email:</strong>
                  <span>info@auracity.com</span>
                </li>
                <li className="mb-3">
                  <strong className="d-block mb-1">Business Hours:</strong>
                  <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>

              <div className="mt-4">
                <h3 className="h6 mb-3">Follow Us</h3>
                <ul className="list-unstyled social">
                  <li>
                    <a href="#"><span className="icon-facebook"></span></a>
                  </li>
                  <li>
                    <a href="#"><span className="icon-twitter"></span></a>
                  </li>
                  <li>
                    <a href="#"><span className="icon-instagram"></span></a>
                  </li>
                  <li>
                    <a href="#"><span className="icon-linkedin"></span></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;