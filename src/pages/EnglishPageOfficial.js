import React, { useContext } from "react";
import { Context } from "../Context";
import DeckItem from "../components/DeckItem";
import NewEnglishDeck from "../components/NewEnglishDeck";

export default function EnglishCardSets() {
  const { englishDecks, createNewDeck, isCreated } = useContext(Context);
  return (
    <div>
      {englishDecks.length > 0 ? (
        <div className="container">
          <div className="custom-grid">
            <button className="new-deck-btn" onClick={createNewDeck}>
              Create A New Deck
            </button>
            {isCreated && <NewEnglishDeck />}
            <div className="deck-grid">
              <DeckItem />
            </div>
          </div>
        </div>
      ) : (
        <div className="first-deck_container">
          <button className="first-deck-btn" onClick={createNewDeck}>
            Create A New Deck
          </button>
          {isCreated && <NewEnglishDeck />}
        </div>
      )}
    </div>
  );
}
