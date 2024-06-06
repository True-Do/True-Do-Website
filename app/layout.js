import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata = {
  title: 'True Do',
  description: 'True Do is Your Productivity Powerhouse',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className='bg-background text-text-dark dark:bg-dark-bg dark:text-text-main-dark'
    >
      <body className={jakarta.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
