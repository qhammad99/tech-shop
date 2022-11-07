import React from "react";
import "./Footer.css";
import logo from "../../../images/logo/logo-no_bg-white.png";
import { FaGithub, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Source Code</h4>
        <p>Github link of the soucrce code of this project</p>
        <a href="https://github.com/qhammad99/tech-shop">
          <FaGithub size="2.5em" className="icon" />
        </a>
      </div>

      <div className="midFooter">
        <img src={logo} alt="logo" />
        <p>Dream Shop for Tech Lovers</p>

        <small>&copy; 2022 qhammad99, github </small>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a
          href="https://github.com/qhammad99"
          style={{
            display: "flex",
            alignItems: "center",
            width: "40%",
          }}
        >
          <FaGithub size="1.5em" style={{ marginRight: 5 }} />
          Github
        </a>
        <a
          href="https://www.facebook.com/maadiTeachings"
          style={{
            display: "flex",
            alignItems: "center",
            width: "40%",
          }}
        >
          <FaFacebookSquare size="1.5em" style={{ marginRight: 5 }} />
          Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
