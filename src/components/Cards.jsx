import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cards = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId, delta) => {
    const product = cart.find(item => item._id === productId);
    if (product) {
      updateQuantity(productId, product.quantity + delta);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.pprice * item.quantity), 0);
  };

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-total">Total</th>
                    <th className="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr key={product._id}>
                      <td className="product-thumbnail">
                        <img 
                          src={`http://localhost:5000/uploads/${product.pimage}`} 
                          alt={product.pname} 
                          className="img-fluid" 
                        />
                      </td>
                      <td className="product-name">
                        <h2 className="h5 text-black">{product.pname}</h2>
                      </td>
                      <td>${product.pprice}</td>
                      <td>
                        <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{maxWidth: '120px'}}>
                          <div className="input-group-prepend">
                            <button 
                              className="btn btn-outline-black decrease" 
                              type="button"
                              onClick={() => handleQuantityChange(product._id, -1)}
                            >&minus;</button>
                          </div>
                          <input 
                            type="text" 
                            className="form-control text-center quantity-amount" 
                            value={product.quantity} 
                            readOnly
                          />
                          <div className="input-group-append">
                            <button 
                              className="btn btn-outline-black increase" 
                              type="button"
                              onClick={() => handleQuantityChange(product._id, 1)}
                            >&plus;</button>
                          </div>
                        </div>
                      </td>
                      <td>${(product.pprice * product.quantity).toFixed(2)}</td>
                      <td>
                        <button 
                          className="btn btn-black btn-sm"
                          onClick={() => handleRemove(product._id)}
                        >X</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="row mb-5">
              <div className="col-md-6 mb-3 mb-md-0">
                <button className="btn btn-black btn-sm btn-block">Update Cart</button>
              </div>
              <div className="col-md-6">
                <button 
                  className="btn btn-outline-black btn-sm btn-block"
                  onClick={handleContinueShopping}
                >Continue Shopping</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="text-black h4" htmlFor="coupon">Coupon</label>
                <p>Enter your coupon code if you have one.</p>
              </div>
              <div className="col-md-8 mb-3 mb-md-0">
                <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
              </div>
              <div className="col-md-4">
                <button className="btn btn-black">Apply Coupon</button>
              </div>
            </div>
          </div>
          <div className="col-md-6 pl-5">
            <div className="row justify-content-end">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <span className="text-black">Subtotal</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">${calculateTotal().toFixed(2)}</strong>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Total</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">${calculateTotal().toFixed(2)}</strong>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <button 
                      className="btn btn-black btn-lg py-3 btn-block"
                      onClick={handleCheckout}
                    >Proceed To Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards; 