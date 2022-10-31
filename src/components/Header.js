import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { Context } from "../Context";

export default function Header() {
  const { chosenLanguage, setChosenLanguage } = useContext(Context);
  function displayLanguages() {
    if (chosenLanguage === "english") {
      return <h2>English Flash Cards</h2>;
    } else if (chosenLanguage === "chinese") {
      return <h2>Chinese Flash Cards</h2>;
    } else return <h2>SuperMemo</h2>;
  }
  return (
    <div className="header">
      <div className="header-home">
        <Link to="/">
          <i
            className="ri-home-3-line ri-2x"
            onClick={() => setChosenLanguage(false)}
          ></i>
        </Link>
        <h3>Home</h3>
      </div>
      {displayLanguages()}
      <nav className="header-language">
        <Link to="/english_page">
          <h3
            className="header-english"
            onClick={() => setChosenLanguage("english")}
          >
            English
          </h3>
        </Link>
        <h3>/</h3>
        <Link to="/chinese_page">
          <h3
            className="header-chinese"
            onClick={() => setChosenLanguage("chinese")}
          >
            Chinese
          </h3>
        </Link>
      </nav>
    </div>
  );
}
