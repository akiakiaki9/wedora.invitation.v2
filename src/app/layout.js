import './globals.css';

export const metadata = {
  title: 'Alisher & Yulduz — Wedding invitation',
  description: 'Alisher and Yulduz invite you to celebrate their wedding on November 1, 2026.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
