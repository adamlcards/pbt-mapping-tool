import { Component, type ErrorInfo, type ReactNode } from 'react';
import { t } from '../i18n/strings';

/**
 * Keeps one broken part from taking down the whole tool.
 *
 * The canvas is the most fragile thing here: it depends on WebGL/2D context,
 * which can be unavailable on locked-down machines, in some virtualised
 * environments, or with hardware acceleration disabled. Without this, that
 * failure renders a completely blank page and the person has no way to reach
 * their own data. With it, the toolbar and List view still work, so the network
 * remains readable, editable and exportable.
 */
interface Props {
  children: ReactNode;
  fallbackTitle: string;
  fallbackHint: string;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Component failed:', error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.error) return this.props.children;
    return (
      <div className="boundary" role="alert">
        <h3>{this.props.fallbackTitle}</h3>
        <p>{this.props.fallbackHint}</p>
        <details>
          <summary>{t().error.technicalDetail}</summary>
          <pre>{this.state.error.message}</pre>
        </details>
        <button className="btn" onClick={() => this.setState({ error: null })}>
          {t().action.tryAgain}
        </button>
      </div>
    );
  }
}
