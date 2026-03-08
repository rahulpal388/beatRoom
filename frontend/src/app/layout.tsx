import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/authContext";
import { ToastNotificationProvider } from "@/context/toastNotificationContext";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/components/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beatroom | Listen music with your friends",
  description: "Share playlists, like tracks, and connect through music.",
  icons: {
    icon: "/BLetterLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-body antialiased  text-black   dark:bg-background bg-background  dark:text-foreground   `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContextProvider>
            <ToastNotificationProvider>
              <Providers>{children}</Providers>
            </ToastNotificationProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
