import React from 'react'

const About = () => {
  return (
    <>
      <div className="why-choose-section">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">Why Choose Us</h2>
              <p>Auracity offers stylish, durable, and affordable furniture with modern designs. Founded by Rushikesh Andhale, we prioritize quality and customer satisfaction.</p>

              <div className="row my-5">
                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src="/assets/images/truck.svg" alt="Image" className="img-fluid" />
                    </div>
                    <h3>Fast &amp; Free Shipping</h3>
                    <p>Get your furniture delivered quickly with no extra cost.</p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src="/assets/images/bag.svg" alt="Image" className="img-fluid" />
                    </div>
                    <h3>Easy to Shop</h3>
                    <p>Seamless online experience with a user-friendly interface.</p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src="/assets/images/support.svg" alt="Image" className="img-fluid" />
                    </div>
                    <h3>24/7 Support</h3>
                    <p>Our team is always available to assist you anytime.</p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src="/assets/images/return.svg" alt="Image" className="img-fluid" />
                    </div>
                    <h3>Hassle Free Returns</h3>
                    <p>Easy returns and exchanges for a worry-free shopping experience.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="img-wrap">
                <img src="/assets/images/why-choose-us-img.jpg" alt="Image" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-5 mx-auto text-center">
              <h2 className="section-title">Our Team</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
              <img src="/assets/images/person_1.jpg" alt="Rushikesh Andhale" className="img-fluid mb-5" />
              <h3><a href="#"><span className="">Andhale</span> Rushikesh</a></h3>
              <span className="d-block position mb-4">CEO, Founder.</span>
              <p>Rushikesh Andhale, founder of Auracity, is committed to offering stylish, high-quality, and durable furniture. With a passion for design, he started Auracity to blend aesthetics with comfort, making every space elegant and functional.</p>
              <p className="mb-0"><a href="#" className="more dark">Learn More <span className="icon-arrow_forward"></span></a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About