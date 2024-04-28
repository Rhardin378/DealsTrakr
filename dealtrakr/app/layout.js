"use client";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";

import "../app/styles.css";
import Navbar from "./components/NavBar";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import Router from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
