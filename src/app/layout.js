import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-75 h-75", // Custom width and height
    },
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          
          <nav sx={{
            width: "calc(100% - 200px)",
            height: "75px",
            backgroundColor: "var(--palette-charcoal-blue)",
            padding: "30px 100px",
            display: 'block'
          }}>
            <img id="nav-logo" src="./mnemo-name-logo-dark-mode.svg"/>
            <SignedOut><SignInButton className="nav-link" /></SignedOut>
            <SignedIn><UserButton appearance={userButtonAppearance}/></SignedIn>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
