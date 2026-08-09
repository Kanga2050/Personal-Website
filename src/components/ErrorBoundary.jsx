import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('Unhandled render error:', error, info);
    }
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="page">
        <div className="page__wash" />
        <div className="shell shell--narrow shell--center stack">
          <h1 className="title">Something broke</h1>
          <p className="lede">
            The page hit an error it could not recover from. Reloading usually
            clears it.
          </p>
          <div className="row row--center">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>

          {import.meta.env.DEV && (
            <details style={{ textAlign: 'left', width: '100%' }}>
              <summary style={{ cursor: 'pointer' }}>Details</summary>
              <pre className="panel" style={{ overflowX: 'auto', fontSize: 12 }}>
                {String(error?.stack ?? error)}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
