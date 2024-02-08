import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider, Box } from '@mui/material'
import theme from './theme';
import { Navbar } from "../components/Navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });

// HEAD
export const metadata: Metadata = {
  title: "Smart Mart",
  description: "Full cycle e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{backgroundColor: "#121212"}}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}> 
        <ThemeProvider theme={theme}>
          <Navbar/>
          <Box component="main" sx={{
            flexGrow: 1,
            color: "text.primary",
            bgcolor: "background.default",
            mt: ["122px", "135px", "146px"],
            p: 3
          }}>
            {children}
          </Box>
        </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
