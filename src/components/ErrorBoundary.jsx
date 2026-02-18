import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
                    <div className="max-w-xl w-full bg-white shadow-xl rounded-lg overflow-hidden border border-red-200">
                        <div className="bg-red-500 px-6 py-4">
                            <h1 className="text-white font-bold text-xl">Something went wrong</h1>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-4">The application crashed with the following error:</p>
                            <pre className="bg-gray-900 text-red-300 p-4 rounded text-sm overflow-auto mb-4 font-mono">
                                {this.state.error && this.state.error.toString()}
                            </pre>
                            <details className="text-xs text-gray-500 cursor-pointer">
                                <summary>Stack Trace</summary>
                                <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto whitespace-pre-wrap">
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-6 w-full bg-gray-900 text-white font-bold py-2 rounded hover:bg-gray-800 transition-colors"
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
