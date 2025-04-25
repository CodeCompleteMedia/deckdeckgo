import { Navigation } from '@/components/core/navigation/Navigation';

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
    }
  }

  interface HTMLElementTagNameMap {
    'app-navigation': Navigation;
  }
} 