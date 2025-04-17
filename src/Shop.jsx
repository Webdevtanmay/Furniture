import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext'
import Notification from './components/Notification'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_random_products?count=8');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/login`);
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await fetch('http://localhost:5000/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const data = await response.json();
      addToCart(product);
      setNotification({
        message: 'Product added to cart successfully!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setNotification({
        message: 'Failed to add product to cart',
        type: 'error'
      });
    }
  };

  const isProductInCart = (productId) => {
    return cart.some(item => item._id === productId);
  };

  if (loading) return <div className="text-center p-5">Loading products...</div>;
  if (error) return <div className="text-center p-5 text-danger">Error: {error}</div>;

  return (
    <div className="untree_co-section product-section before-footer-section">
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-12 col-md-4 col-lg-3 mb-5">
              <div className="product-item">
                <a className="product-img">
                  <img 
                    src={`http://localhost:5000/uploads/${product.pimage}`} 
                    className="img-fluid product-thumbnail" 
                    alt={product.pname}
                  />
                  <span className="on-sale">Sale!</span>
                </a>
                <h3 className="product-title">{product.pname}</h3>
                <strong className="product-price">₹{product.pprice}</strong>
                <button 
                  className="btn btn-black btn-sm mt-2"
                  onClick={() => handleAddToCart(product)}
                  disabled={isProductInCart(product._id)}
                  style={{
                    opacity: isProductInCart(product._id) ? 0.7 : 1,
                    cursor: isProductInCart(product._id) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isProductInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Shop;