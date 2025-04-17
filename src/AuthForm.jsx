import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const navigate = useNavigate();

  // Check for duplicate username
  const checkUsername = async (username) => {
    if (!username) {
      setUsernameError('');
      return;
    }

    setIsCheckingUsername(true);
    try {
      const response = await fetch(`http://localhost:5000/check-username?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON');
      }

      const data = await response.json();
      console.log('Username check response:', data);
      
      if (!data.success) {
        throw new Error(data.message || 'Error checking username');
      }

      if (!data.available) {
        setUsernameError('Username is already taken');
      } else {
        setUsernameError('');
      }
    } catch (err) {
      console.error('Error checking username:', err);
      setUsernameError('Error checking username availability');
    } finally {
      setIsCheckingUsername(false);
    }
  };

  // Debounce username check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLogin && formData.username) {
        checkUsername(formData.username);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username, isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (usernameError) {
          setError('Please choose a different username');
          return;
        }
      }

      const endpoint = isLogin ? '/login' : '/register';
      console.log('Sending request to:', endpoint, 'with data:', formData);
      
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON');
      }

      const data = await response.json();
      console.log('Response received:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(data.message);
      console.log('Success:', data);

      if (isLogin) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setIsLogin(true);
        setFormData({
          fullName: '',
          username: '',
          email: '',
          phone: '',
          city: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      console.error('Error details:', err);
      if (err.message.includes('Failed to fetch')) {
        setError('Unable to connect to the server. Please check if the server is running.');
      } else if (err.message.includes('did not return JSON')) {
        setError('Server returned an invalid response. Please try again.');
      } else {
        setError(err.message || 'An error occurred during registration');
      }
    }
  };

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="section-title">{isLogin ? 'Login' : 'Register'}</h2>
                  <p className="text-muted">
                    {isLogin 
                      ? 'Welcome back! Please login to your account.' 
                      : 'Create a new account to get started.'}
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                          type="text"
                          className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                        {isCheckingUsername && (
                          <div className="form-text">Checking username availability...</div>
                        )}
                        {usernameError && (
                          <div className="invalid-feedback">{usernameError}</div>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
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

                      <div className="col-md-6 mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={!isLogin && (isCheckingUsername || usernameError)}
                    >
                      {isLogin ? 'Login' : 'Register'}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      className="btn btn-link p-0 ms-2"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                        setSuccess('');
                        setUsernameError('');
                      }}
                    >
                      {isLogin ? 'Register' : 'Login'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 