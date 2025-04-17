import React from 'react'
import AuthForm from './AuthForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="container">
        <button 
          className="btn btn-link mb-4" 
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
      <AuthForm />
    </div>
  )
}

export default Login