import { useState, useEffect } from 'react'

function Snackbar({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const styles = {
    snackbar: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: '500px',
      animation: isExiting ? 'slideOut 0.3s ease-in' : 'slideIn 0.3s ease-out',
      backgroundColor: type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500'
    },
    icon: {
      fontSize: '20px',
      flexShrink: 0
    },
    message: {
      flex: 1
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '18px',
      padding: '0',
      marginLeft: '8px',
      opacity: 0.8,
      transition: 'opacity 1.0s'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'info':
        return 'ℹ'
      default:
        return '✓'
    }
  }

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, 300)
  }

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(-100%);
              opacity: 0;
            }
          }
        `}
      </style>
      <div style={styles.snackbar}>
        <span style={styles.icon}>{getIcon()}</span>
        <span style={styles.message}>{message}</span>
        <button 
          style={styles.closeButton}
          onClick={handleClose}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.8'}
        >
          ×
        </button>
      </div>
    </>
  )
}

export default Snackbar