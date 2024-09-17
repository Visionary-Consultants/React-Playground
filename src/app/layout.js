import 'normalize.css/normalize.css';
import "./globals.css";

export const metadata = {
  title: "VISCO",
  description: "Welcome to visco",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
