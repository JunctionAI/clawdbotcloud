import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }

    // Track error with analytics (if available)
    if (window.analytics) {
      window.analytics.trackError(error.toString(), {
        componentStack: errorInfo.componentStack,
        source: 'ErrorBoundary'
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 shadow-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6 mx-auto">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              
              <h1 className="text-2xl font-black text-white text-center mb-2">
                Something Went Wrong
              </h1>
              
              <p className="text-white/60 text-center text-sm mb-6">
                We encountered an unexpected error. Don't worry, your data is safe.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-black/40 rounded-2xl p-4 mb-6 overflow-auto max-h-40">
                  <p className="text-red-400 text-xs font-mono break-all">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              <button
                onClick={this.handleReset}
                className="w-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 hover:shadow-2xl"
              >
                <RefreshCcw size={20} />
                <span>Try Again</span>
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full mt-3 bg-white/5 border border-white/10 text-white/60 font-bold py-3 px-6 rounded-2xl transition-all active:scale-95 hover:bg-white/10"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
