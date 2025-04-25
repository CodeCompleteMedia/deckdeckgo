import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NavigationWrapper } from '@/components/core/navigation/NavigationWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeckDeckGo - The web open source editor for presentations',
  description: 'Create, present and share your slides as Progressive Web Apps',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationWrapper>
          <div slot="start">
            {/* Add navigation start content here */}
          </div>
          <div slot="end">
            {/* Add navigation end content here */}
          </div>
        </NavigationWrapper>
        {children}
      </body>
    </html>
  );
} 