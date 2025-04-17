import React from 'react';
import { useCart } from '../context/CartContext';

const Notification = () => {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="notification">
      <div className="notification-content">
        <i className="fas fa-check-circle"></i>
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification; 