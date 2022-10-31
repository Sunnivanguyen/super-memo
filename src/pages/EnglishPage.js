import React, { useContext } from "react";
import CardItem from "../components/CardItem";
import NewEnglishCard from "../components/NewEnglishCard";
import { Context } from "../Context";

function EnglishPage() {
  const { englishCards, isCreated, createNewCard } = useContext(Context);
  return (
    <>
      {englishCards.length > 0 ? (
        <div className="container">
          <div className="custom-grid">
            <button className="new-flashcard-btn" onClick={createNewCard}>
              Create A New Card
            </button>
          </div>
          <div className="card-grid">
            <CardItem />
          </div>
        </div>
      ) : (
        <div className="first-card_container">
          <button className="first-flashcard-btn" onClick={createNewCard}>
            Create A New Card
          </button>
          {isCreated && <NewEnglishCard />}
        </div>
      )}
    </>
  );
}
export default EnglishPage;
