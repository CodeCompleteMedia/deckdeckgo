import { Navigation } from '@/components/core/navigation/Navigation';
import { SignIn } from '@/components/auth/SignIn';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'app-navigation': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          actions?: 'all' | 'none' | 'editor-less';
        },
        HTMLElement
      >;
      'slide-title': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          title?: string;
        },
        HTMLElement
      >;
      'app-signin': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }

  interface HTMLElementTagNameMap {
    'app-navigation': Navigation;
    'app-signin': SignIn;
  }
} 