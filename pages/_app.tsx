/* eslint-disable react/jsx-filename-extension */
import "@/styles/globals.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/auth";
// import { SessionProvider } from "next-auth/react"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
   
    </>
  );
}
