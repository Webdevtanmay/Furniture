import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      console.log('Fetching cart items...');
      const response = await fetch('http://localhost:5000/get-cart');
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      console.log('Parsed data:', data);
      
      if (data.success && data.cartItems) {
        console.log('Setting cart items:', data.cartItems);
        setCartItems(data.cartItems);
      } else {
        console.log('No cart items found or invalid response format');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      console.log(`Updating quantity for product ${productId} to ${newQuantity}`);
      const response = await fetch(`http://localhost:5000/update-cart-quantity/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      const data = await response.json();
      console.log('Update response:', data);

      // Update local state
      setCartItems(prevItems => 
        prevItems.map(item => 
          item._id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      console.log(`Removing cart item for product ID: ${productId}`);
      const response = await fetch(`http://localhost:5000/remove-from-cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.message || 'Failed to remove from cart');
        } catch (e) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
      }

      // Update local state
      setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
      console.log('Item removed successfully');
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  const handleCheckout = () => {
    console.log('Checkout initiated with items:', cartItems);
    console.log('Total amount:', cartItems.reduce((total, item) => total + (item.pprice * item.quantity), 0));
    navigate('/checkout');
  };

  if (loading) {
    return <div className="text-center p-5">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="untree_co-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <h2>Your cart is empty</h2>
              <button 
                className="btn btn-black"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="mb-4">Shopping Cart</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={`http://localhost:5000/uploads/${item.pimage}`} 
                            alt={item.pname}
                            className="img-fluid"
                            style={{ width: '50px', marginRight: '10px' }}
                          />
                          <span>{item.pname}</span>
                        </div>
                      </td>
                      <td>₹{item.pprice}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>₹{item.pprice * item.quantity}</td>
                      <td>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td>
                      <strong>₹{cartItems.reduce((total, item) => total + (item.pprice * item.quantity), 0)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button 
                className="btn btn-black"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
              <button 
                className="btn btn-black"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;