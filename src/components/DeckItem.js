import React, { useContext } from "react";
import { Context } from "../Context";
import defaultImage from "../images/default-image.jpg";
export default function EnglishCardSetItem() {
  const { chosenLanguage, englishDecks, imgURL, currentEnglishDeckId } =
    useContext(Context);
  return (
    <>
      {chosenLanguage === "english" &&
        englishDecks.map((item) => (
          <div
            className={`deck ${
              item.id === currentEnglishDeckId ? "selected-deck" : ""
            }`}
            key={item.id}
          >
            <div className="deck-item">
              <img
                src={imgURL ? imgURL : defaultImage}
                alt={item.name}
                className="deck-image"
              />
            </div>
          </div>
        ))}
    </>
  );
}
