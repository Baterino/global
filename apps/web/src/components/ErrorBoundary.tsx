import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="mx-auto max-w-[1200px] px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-heading-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-body-md text-neutral-600 dark:text-neutral-400 mb-6">
            We’re sorry. Please try again.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-body-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
