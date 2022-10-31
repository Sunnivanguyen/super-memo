import React, { useContext } from "react";
import CardItem from "../components/CardItem";
import NewChineseCard from "../components/NewChineseCard";
import { Context } from "../Context";

function ChinesePage() {
  const { chineseCards, isCreated, createNewCard } = useContext(Context);

  return (
    <>
      {chineseCards.length > 0 ? (
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
          {isCreated && <NewChineseCard />}
        </div>
      )}
    </>
  );
}
export default ChinesePage;
