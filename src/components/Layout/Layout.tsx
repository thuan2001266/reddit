import React from "react";
import Navbar from "../Navbar/Navbar";

// interface LayoutProps {
//   children: React.ReactNode;
// }

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
};
export default Layout;
