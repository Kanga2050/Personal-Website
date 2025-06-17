import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1e1e, #2d2d2d)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      };

      const contentStyle = {
        textAlign: 'center',
        maxWidth: '600px'
      };

      const titleStyle = {
        fontSize: '2rem',
        marginBottom: '1rem',
        color: '#ff6b6b'
      };

      const messageStyle = {
        fontSize: '1.1rem',
        marginBottom: '2rem',
        opacity: 0.8
      };

      const buttonStyle = {
        padding: '12px 24px',
        background: '#4ade80',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      };

      return (
        <div style={containerStyle}>
          <div style={contentStyle}>
            <h1 style={titleStyle}>Something went wrong</h1>
            <p style={messageStyle}>
              We encountered an unexpected error. Don't worry, this has been logged and we'll fix it soon.
            </p>
            <button 
              style={buttonStyle}
              onClick={() => window.location.reload()}
              onMouseEnter={(e) => e.target.style.background = '#22c55e'}
              onMouseLeave={(e) => e.target.style.background = '#4ade80'}
            >
              Reload Application
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '2rem', textAlign: 'left' }}>
                <summary style={{ cursor: 'pointer', marginBottom: '1rem' }}>Error Details</summary>
                <pre style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  padding: '1rem', 
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  overflow: 'auto'
                }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
