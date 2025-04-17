import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_random_products?count=3');
        const data = await response.json();
        console.log('Random Products:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching random products:', error);
      }
    };

    fetchRandomProducts();
  }, []);

  return (
    <>
      <div class="product-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-3 mb-5 mb-lg-0">
              <h2 class="mb-4 section-title">
                Crafted with excellent material.
              </h2>
              <p class="mb-4">
                At Auracity, we use premium materials to ensure durability,
                comfort, and style. Every piece is designed with precision,
                offering long-lasting quality that enhances your space
                effortlessly.
              </p>
              <p>
                <a href="shop.html" class="btn">
                  Explore
                </a>
              </p>
            </div>
            {products.map((product, index) => (
              <div key={index} class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                <a class="product-item" href="cart.html">
                  <img
                    src={`http://localhost:5000/uploads/${product.pimage}`}
                    class="img-fluid product-thumbnail"
                    alt={product.pname}
                  />
                  <h3 class="product-title">{product.pname}</h3>
                  <strong class="product-price">₹{product.pprice}</strong>
                  <span class="icon-cross">
                    <img src="public/assets/images/cross.svg" class="img-fluid" alt="Add to cart" />
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div class="why-choose-section">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-6">
              <h2 class="section-title">Why Choose Us</h2>
              <p>
                Auracity offers stylish, durable, and affordable furniture with
                modern designs. Founded by Rushikesh Andhale, we prioritize
                quality and customer satisfaction.
              </p>

              <div class="row my-5">
                <div class="col-6 col-md-6">
                  <div class="feature">
                    <div class="icon">
                      <img
                        src="public/assets/images/truck.svg"
                        alt="Image"
                        class="imf-fluid"
                      />
                    </div>
                    <h3>Fast &amp; Free Shipping</h3>
                    <p>
                      Get your furniture delivered quickly with no extra cost.
                    </p>
                  </div>
                </div>

                <div class="col-6 col-md-6">
                  <div class="feature">
                    <div class="icon">
                      <img
                        src="public/assets/images/bag.svg"
                        alt="Image"
                        class="imf-fluid"
                      />
                    </div>
                    <h3>Easy to Shop</h3>
                    <p>
                      Seamless online experience with a user-friendly interface.
                    </p>
                  </div>
                </div>

                <div class="col-6 col-md-6">
                  <div class="feature">
                    <div class="icon">
                      <img
                        src="public/assets/images/support.svg"
                        alt="Image"
                        class="imf-fluid"
                      />
                    </div>
                    <h3>24/7 Support</h3>
                    <p>Our team is always available to assist you anytime.</p>
                  </div>
                </div>

                <div class="col-6 col-md-6">
                  <div class="feature">
                    <div class="icon">
                      <img
                        src="public/assets/images/return.svg"
                        alt="Image"
                        class="imf-fluid"
                      />
                    </div>
                    <h3>Hassle Free Returns</h3>
                    <p>
                      Easy returns and exchanges for a worry-free shopping
                      experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-5">
              <div class="img-wrap">
                <img
                  src="public/assets/images/why-choose-us-img.jpg"
                  alt="Image"
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="we-help-section">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-7 mb-5 mb-lg-0">
              <div class="imgs-grid">
                <div class="grid grid-1">
                  <img
                    src="public/assets/images/img-grid-1.jpg"
                    alt="Untree.co"
                  />
                </div>
                <div class="grid grid-2">
                  <img
                    src="public/assets/images/img-grid-2.jpg"
                    alt="Untree.co"
                  />
                </div>
                <div class="grid grid-3">
                  <img
                    src="public/assets/images/img-grid-3.jpg"
                    alt="Untree.co"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-5 ps-lg-5">
              <h2 class="section-title mb-4">
                We Help You Make Modern Interior Design
              </h2>
              <p>
                At Auracity, we bring stylish, functional, and high-quality
                furniture to transform your space. Our designs blend elegance
                with comfort, ensuring a perfect fit for modern interiors.
                Whether it's your home or office, we provide pieces that enhance
                aesthetics while maintaining durability and practicality.
              </p>

              <ul class="list-unstyled custom-list my-4">
                <li>
                  Modern Designs – Stylish furniture that enhances your space.
                </li>
                <li>High Quality – Durable materials for long-lasting use.</li>
                <li>Affordable Prices – Premium designs at the best value.</li>
                <li>
                  Easy Shopping – Smooth online experience with fast delivery.
                </li>
              </ul>
              <p>
                <a herf="#" class="btn">
                  Explore
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="blog-section">
        <div class="container">
          <div class="row mb-5">
            <div class="col-md-6">
              <h2 class="section-title">Recent Blog</h2>
            </div>
            <div class="col-md-6 text-start text-md-end">
              <a href="#" class="more">
                View All Posts
              </a>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
              <div class="post-entry">
                <a href="#" class="post-thumbnail">
                  <img
                    src="public/assets/images/post-1.jpg"
                    alt="Image"
                    class="img-fluid"
                  />
                </a>
                <div class="post-content-entry">
                  <h3>
                    <a href="#">First Time Home Owner Ideas</a>
                  </h3>
                  <div class="meta">
                    <span>
                      by <a href="#">Monu</a>
                    </span>{" "}
                    <span>
                      on <a href="#">Dec 19, 2021</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
              <div class="post-entry">
                <a href="#" class="post-thumbnail">
                  <img
                    src="public/assets/images/post-2.jpg"
                    alt="Image"
                    class="img-fluid"
                  />
                </a>
                <div class="post-content-entry">
                  <h3>
                    <a href="#">How To Keep Your Furniture Clean</a>
                  </h3>
                  <div class="meta">
                    <span>
                      by <a href="#">Somu</a>
                    </span>{" "}
                    <span>
                      on <a href="#">Dec 15, 2021</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
              <div class="post-entry">
                <a href="#" class="post-thumbnail">
                  <img
                    src="public/assets/images/post-3.jpg"
                    alt="Image"
                    class="img-fluid"
                  />
                </a>
                <div class="post-content-entry">
                  <h3>
                    <a href="#">Small Space Furniture Apartment Ideas</a>
                  </h3>
                  <div class="meta">
                    <span>
                      by <a href="#">Dhanu</a>
                    </span>{" "}
                    <span>
                      on <a href="#">Dec 12, 2021</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
