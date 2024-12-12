import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/lib/providers/ReactQueryProvider';
import RTKProvider from '@/lib/providers/RTKClientProvider';

const jakarta = Plus_Jakarta_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
});

const APP_NAME = 'True Do';
const APP_DEFAULT_TITLE = 'True Do';
const APP_TITLE_TEMPLATE = '%s';
const APP_DESCRIPTION = 'True Do is your Productivity Powerhouse';

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='dark'>
      <body className={jakarta.className}>
        <main className='bg-dark-bg text-white'>
          <ReactQueryProvider>
            <RTKProvider>{children}</RTKProvider>
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
