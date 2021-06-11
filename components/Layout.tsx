import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="font-lf-font">
      <Header />
      <div
        className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"
        style={{ minHeight: "85.5vh" }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
