import React from "react";
import "./footer.scss";

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="footer">
      <span className="footer__copyright">
        Copyright © {new Date().getFullYear()} Rokas Gulbinas
      </span>
      <span className="footer__contact">
        Contact at: <i>rkgulbinas@gmail.com</i>
      </span>
    </footer>
  );
};

export default Footer;
