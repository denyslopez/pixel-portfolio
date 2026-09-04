import { fontVariables } from "../fonts";
import "../globals.css";
import "../experience.css";
import "../accessibility.css";
import "../r1.css";

export default function RedirectRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
