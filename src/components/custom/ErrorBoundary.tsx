import React from 'react';
import ErrorMessage from '../elements/ErrorMessage';

interface Props {
  children: JSX.Element;
}
class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false };

  componentDidCatch(error: unknown) {
    // report the error to your favorite Error Tracking tool (ex: Sentry, Bugsnag)
    console.error(error);
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage title="Error" message="Something went wrong. Please try again." />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
