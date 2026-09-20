"use client";

import { Component, type ReactNode } from "react";

import { WorkIndexFallback } from "@/components/index/WorkIndexFallback";

type State = { hasError: boolean };

export class SceneErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <WorkIndexFallback />;
    }
    return this.props.children;
  }
}
