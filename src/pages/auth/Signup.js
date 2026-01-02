import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import Snackbar from '../../components/snackbar'
import { useAuth } from '../../context/AuthContext'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('parent')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [snackbar, setSnackbar] = useState(null)
  const navigate = useNavigate()
  const { login: loginUser } = useAuth();

  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ message, type })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      name,
      email,
      password,
      role
    }
    
    console.log('Signup payload:', payload)

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('role', role)

        loginUser(data.user)

        showSnackbar(`Welcome ${name}! Account created successfully`, 'success')
        
        setTimeout(() => {
          navigate(role === 'parent' ? '/parent' : '/admin')
        }, 1500)
      } else {
        setError(data.message || 'Signup failed. Please try again.')
        showSnackbar(data.message || 'Signup failed. Please try again.', 'error')
      }

    } catch (err) {
      console.error('Signup error:', err)
      setError('Network error. Please check your connection and try again.')
      showSnackbar('Network error. Please check your connection.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      console.log('Google User:', decoded)
      
      const payload = {
        token: credentialResponse.credential,
        email: decoded.email,
        name: decoded.name,
        role: role
      }
      
      console.log('Sending to backend:', payload)
      
      const response = await fetch('http://localhost:5000/api/auth/google-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('role', role)

        loginUser(data.user)

        showSnackbar(`Welcome ${decoded.name}! Account created successfully`, 'success')
        
        setTimeout(() => {
          navigate(role === 'parent' ? '/parent-dashboard' : '/admin-dashboard')
        }, 1500)
      } else {
        showSnackbar(data.message || 'Google signup failed', 'error')
      }
      
    } catch (error) {
      console.error('Google signup error:', error)
      showSnackbar('Google signup failed. Please try again.', 'error')
    }
  }

  const handleGoogleError = () => {
    console.error('Google signup failed')
    showSnackbar('Google signup failed. Please try again.', 'error')
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="signup-container">
        <div className="signup-overlay"></div>

        <div className="signup-card">
          <h1 className="signup-title">Create AI Account</h1>
          <p className="signup-subtitle">
            Join SmartAttend Intelligent Platform
          </p>

          <div className="tab-selector">
            <button
              className={`tab-signup ${role === 'parent' ? 'active' : ''}`}
              onClick={() => setRole('parent')}
              type="button"
            >
              Parent
            </button>
            <button
              className={`tab-signup ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
              type="button"
            >
              Admin
            </button>
          </div>
        
          <div className="google-auth-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_black"
              size="large"
              text="signup_with"
              shape="rectangular"
              width="340"
            />
          </div>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          {error && (
            <div className="error-message" style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label className="auth-input-label" for="name">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                id="name"
              />
            </div>

            <div className="auth-input-group">
              <label className="auth-input-label" for="email">Email Address</label>
              <input
                type="email"
                placeholder="you@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                id="email"
              />
            </div>

            <div className="auth-input-group">
              <label className="auth-input-label" for="password">Password</label>
              <input
                type="password"
                placeholder="Create secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                disabled={loading}
                id="password"
              />
            </div>

            <button 
              className="signup-btn" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : `Create Account as ${role === 'parent' ? 'Parent' : 'Admin'}`}
            </button>
          </form>

          <div className="login-link">
            <span>Already have an account?</span>
            <Link to="/"> Log in</Link>
          </div>

          <p className="signup-footer">
            © 2025 SmartAttend AI · Future of Attendance
          </p>
        </div>
      </div>

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          duration={3000}
          onClose={() => setSnackbar(null)}
        />
      )}
    </GoogleOAuthProvider>
  )
}

export default Signup