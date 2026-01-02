import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import Snackbar from '../../components/snackbar'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('parent')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [snackbar, setSnackbar] = useState(null)
  const navigate = useNavigate()

  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ message, type })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      email,
      password,
      role
    }
    
    console.log('Login payload:', payload)

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('role', role)

        showSnackbar('Welcome back! Logged in successfully', 'success')
        
        setTimeout(() => {
          navigate(role === 'parent' ? '/parent' : '/admin')
        }, 1500)
      } else {
        setError(data.message || 'Login failed. Please check your credentials.')
        showSnackbar(data.message || 'Login failed. Please check your credentials.', 'error')
      }

    } catch (err) {
      console.error('Login error:', err)
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
      
      const response = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('role', role)

        showSnackbar(`Welcome back ${decoded.name}!`, 'success')
        
        setTimeout(() => {
          navigate(role === 'parent' ? '/parent' : '/admin')
        }, 1500)
      } else {
        showSnackbar(data.message || 'Google login failed', 'error')
      }
      
    } catch (error) {
      console.error('Google login error:', error)
      showSnackbar('Google login failed. Please try again.', 'error')
    }
  }

  const handleGoogleError = () => {
    console.error('Google login failed')
    showSnackbar('Google login failed. Please try again.', 'error')
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="login-container">
        <div className="login-overlay"></div>

        <div className="login-card">
          <h1 className="login-title">SmartAttend AI</h1>
          <p className="login-subtitle">
            AI-Powered Attendance & Identity System
          </p>

          <div className="tab-selector">
            <button
              className={`tab ${role === 'parent' ? 'active' : ''}`}
              onClick={() => setRole('parent')}
              type="button"
            >
              Parent
            </button>
            <button
              className={`tab ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
              type="button"
            >
              Admin
            </button>
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
            <div className="login-input-group">
              <label className="input-label" for="email">Email Address</label>
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

            <div className="login-input-group">
              <label className="input-label" for="password">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                id="password"
              />
            </div>

            <button 
              className="login-btn" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : `Secure Login as ${role === 'parent' ? 'Parent' : 'Admin'}`}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="google-auth-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_blue"
              size="large"
              text="signin_with"
              shape="rectangular"
              width="340"
            />
          </div>

          <div className="signup-link">
            <span>Not a member?</span>
            <Link to="/register"> Sign up</Link>
          </div>

          <p className="login-footer">
            © 2025 SmartAttend AI · Secure · Intelligent
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

export default Login