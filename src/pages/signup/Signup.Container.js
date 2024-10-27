import React from "react";
import logo from "../../images/logo.png";
import Footer from "../base/Footer";
import SignUp from "./SignUpPage";

export default function SignupContainer() {
  return (
    <div className="text-center">
      <div className="outer-div">
        <img src={logo} height={128} />
        <SignUp />
      </div>
      <Footer />
    </div>
  );
}
