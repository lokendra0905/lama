import { Inter } from "next/font/google";
import "./globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "@/theme";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className={inter.className}>
        <Box bg={"white"} width={'100%'}>
          <ChakraProvider>{children}</ChakraProvider>
        </Box>
      </body>
    </html>
  );
}
