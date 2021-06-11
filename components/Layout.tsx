import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="font-lf-font min-h-full flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-full flex flex-col w-full flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
