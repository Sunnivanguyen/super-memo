import React, { useContext } from "react";
import { Context } from "../Context";
import EditEnglishCard from "./EditEnglishCard";
import EditChineseCard from "./EditChineseCard";
import NewEnglishCard from "./NewEnglishCard";
import NewChineseCard from "./NewChineseCard";
import ReviewCard from "./ReviewCard";

export default function CardItem() {
  const {
    chosenLanguage,
    englishCards,
    setEnglishCards,
    chineseCards,
    setChineseCards,
    isReviewed,
    isEdited,
    isCreated,
    currentEngCardId,
    currentChineseCardId,
    editCard,
    reviewCard,
    findCurrentCard,
  } = useContext(Context);

  function deleteCard(event, cardId) {
    event.stopPropagation();
    if (chosenLanguage === "english") {
      setEnglishCards((oldCards) =>
        oldCards.filter((card) => card.id !== cardId)
      );
    } else if (chosenLanguage === "chinese") {
      setChineseCards((oldCards) =>
        oldCards.filter((card) => card.id !== cardId)
      );
    }
    console.log(`${chosenLanguage} : ${cardId}`);
  }

  return (
    <>
      {chosenLanguage === "english" &&
        englishCards.map((item) => (
          <div
            className={`card ${
              item.id === currentEngCardId ? "selected-card" : ""
            }`}
            key={item.id}
          >
            <div
              className={`card-item ${item.type}`}
              onClick={(event) => reviewCard(event, item.id)}
            >
              <i
                className="ri-edit-2-line ri-lg"
                onClick={(event) =>
                  editCard(event, item.id, item.question, item.answer)
                }
              ></i>
              <i
                className="ri-delete-bin-6-line ri-lg"
                onClick={(event) => deleteCard(event, item.id)}
              ></i>
              <div className="card-body">{item.question}</div>
              <i className="ri-heart-3-line ri-lg"></i>
            </div>
            {isReviewed && <ReviewCard currentCard={findCurrentCard()} />}
            {isEdited && <EditEnglishCard item={item} />}
            {isCreated && <NewEnglishCard item={item} />}
          </div>
        ))}
      {chosenLanguage === "chinese" &&
        chineseCards.map((item) => (
          <div
            className={`card ${
              item.id === currentChineseCardId ? "selected-card" : ""
            }`}
            key={item.id}
          >
            <div
              className={`card-item ${item.type}`}
              onClick={(event) => reviewCard(event, item.id)}
            >
              <i
                className="ri-edit-2-line ri-lg"
                onClick={(event) =>
                  editCard(event, item.id, item.question, item.answer)
                }
              ></i>
              <i
                className="ri-delete-bin-6-line ri-lg"
                onClick={(event) => deleteCard(event, item.id)}
              ></i>
              <div className="card-body">{item.question}</div>
              <i className="ri-heart-3-line ri-lg"></i>
            </div>
            {isReviewed && <ReviewCard currentCard={findCurrentCard()} />}
            {isEdited && <EditChineseCard item={item} />}
            {isCreated && <NewChineseCard item={item} />}
          </div>
        ))}
    </>
  );
}
