import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import "./App.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Abhishek Dwivedi | Connect with me:</p>
      <div className="social-icons">
        <a href="mailto:abhishekdwivediofficial65@gmail.com"><FaEnvelope /></a>
        <a href="https://github.com/abhishekdwivedi87" target="_blank" rel="noreferrer"><FaGithub /></a>
        <a href="https://instagram.com/abhishek_.dwivedi_" target="_blank" rel="noreferrer"><FaInstagram /></a>
        <a href="https://www.linkedin.com/in/abhishek-dwivedi-6156312b9" target="_blank" rel="noreferrer"><FaLinkedin /></a>
      </div>
    </footer>
  );
}

export default Footer;
