import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: ""
        };
    }
    componentDidCatch(error, errorinfo) {
        this.setState((prev) => ({
            ...prev,
            error,
            errorInfo: errorinfo
        }));
    }

    static getDerivedStateFromError() {
        return {hasError: true}
    }

  render() {
    if(this.state.hasError) {
        return (
            <div>
                Error: {this.state.error}
                Error Information: {this.state.errorInfo}
            </div>
        )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;