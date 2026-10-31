import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Porsche application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-8 text-center font-sans">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 p-8 shadow-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-red-500 font-bold mb-3">
              Porsche Concierge
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-white mb-3">
              Experience Reload Needed
            </h1>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
              A temporary interface state occurred while loading vehicle telemetry. Click below to reload the Porsche digital experience.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer border border-red-500/40"
            >
              Reload Experience
            </button>
            {this.state.error && (
              <pre className="mt-6 p-3 bg-neutral-950 text-left text-[10px] text-neutral-500 overflow-x-auto border border-neutral-800">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
