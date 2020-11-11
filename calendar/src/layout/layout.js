
import React from "react";
import FormApp from "./../form/FormApp"
import Logo from "./Logo";
function Layout() {
  return (
      <div className="column">
      <Logo></Logo>
      <h3>לקבלת דוגמית חינם</h3>
      <h4>מלאו את הפרטים:</h4>
      <FormApp></FormApp>
      </div>
  );
}

export default Layout;