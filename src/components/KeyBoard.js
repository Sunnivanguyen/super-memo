import React, { useContext } from "react";
import data from "../data";
import { Context } from "../Context";

export default function KeyBoard() {
  const { chosenLanguage, setCurrentKeyValue } = useContext(Context);

  function clickButton(keyValue) {
    setCurrentKeyValue(keyValue);
  }

  function flipKeyBoard(e) {
    e.stopPropagation();
    console.log(chosenLanguage);
  }

  const englishKeyBoard = data.english.map((key) => (
    <button
      className="english_key"
      key={key.id}
      onClick={() => clickButton(key.value)}
      style={{ color: key.specialFeature ? "red" : "black", fontWeight: 700 }}
    >
      {key.name}
    </button>
  ));
  const chineseKeyBoard = data.chinese.map((key) => (
    <button
      className="chinese_key"
      key={key.id}
      onClick={() => clickButton(key.value)}
      style={{ color: key.specialFeature ? "red" : "black", fontWeight: 700 }}
    >
      {key.name}
    </button>
  ));
  return (
    <>
      <div className="global-keyboard">
        <div className="keyboard-header">
          <i className="ri-global-line ri-lg" onClick={flipKeyBoard}></i>
          <p>English</p>
        </div>
        <div className="english-keyboard">{englishKeyBoard}</div>
        <div className="chinese-keyboard">{chineseKeyBoard}</div>
      </div>
    </>
  );
}
