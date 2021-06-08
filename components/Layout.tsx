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
      {children}
      <Footer />
    </div>
  );
}
