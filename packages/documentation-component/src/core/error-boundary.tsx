import React from "react";

import { ERROR_TEXT } from "../constants";

interface StateShape {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<{}, StateShape> {
  static getDerivedStateFromError(err: Error) {
    return { error: err };
  }
  state: StateShape = { error: null };

  componentDidCatch(error: any, info: any) {
    console.error(error);
    console.error(info);
  }

  render() {
    if (!!this.state.error) {
      return (
        <section className={`dc__error`}>
          <p>{ERROR_TEXT}</p>
        </section>
      );
    }

    return this.props.children;
  }
}
