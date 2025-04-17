import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_random_products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate('/login');
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="untree_co-section product-section before-footer-section">
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-12 col-md-4 col-lg-3 mb-5">
              <div className="product-item" onClick={() => handleProductClick(product)}>
                <a className="product-img">
                  <img 
                    src={`http://localhost:5000/uploads/${product.pimage}`} 
                    alt={product.pname} 
                    className="img-fluid product-thumbnail"
                  />
                  <span className="on-sale">Sale!</span>
                </a>
                <h3 className="product-title">{product.pname}</h3>
                <strong className="product-price">${product.pprice}</strong>
                <span className="icon-cross">
                  <img src="images/cross.svg" className="img-fluid" />
                </span>
                {!cart.find(item => item._id === product._id) && (
                  <button 
                    className="btn btn-black btn-sm mt-2"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop; 