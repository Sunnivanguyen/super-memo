import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import rotateIcon from "../images/rotate-icon.png";

const StyledPopUpBackdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f1f185;
  left: 0;
  top: 0;
  display: none;
  &.show_review-card {
    display: flex;
  }
`;
const StyledReviewCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.4);
  height: fit-content;
  width: fit-content;
  padding: 30px 40px;
  background: #d62828;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ReviewCard = ({ currentCard }) => {
  const {
    chosenLanguage,
    englishCards,
    chineseCards,
    isReviewed,
    setIsReviewed,
  } = useContext(Context);
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const [count, setCount] = useState(0);
  const frontEl = useRef();
  const backEl = useRef();
  const checkEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    const checkHeight = checkEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight + 80, backHeight + 80, checkHeight + 100));
  }

  useEffect(setMaxHeight, [height, currentCard.question, currentCard.answer]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  function flipCard(event) {
    event.stopPropagation();
    setFlip((prev) => !prev);
  }

  function getLeftCards() {
    let cardsLeft = [];
    if (chosenLanguage === "english") {
      cardsLeft = englishCards.filter((card) => card.id !== currentCard.id);
    } else if (chosenLanguage === "chinese") {
      cardsLeft = chineseCards.filter((card) => card.id !== currentCard.id);
    }
    return [currentCard, ...cardsLeft];
  }

  function changeCurrentCard() {
    const newArray = getLeftCards();
    for (let i = 0; i < newArray.length; i++) {
      if (i === count) {
        return newArray[i];
      }
    }
  }
  const newCurrentCard = changeCurrentCard();

  function toTheNext() {
    const newArray = getLeftCards();
    if (count >= 0 && count < newArray.length - 1) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  }

  function getBack() {
    const newArray = getLeftCards();
    if (count >= 1 && count < newArray.length) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  }

  return (
    <StyledPopUpBackdrop
      id="backdrop_review-card"
      className={isReviewed ? "show_review-card" : ""}
    >
      <StyledReviewCard id="popup_review-card">
        <i
          className="ri-close-fill ri-xl"
          onClick={() => setIsReviewed(false)}
        ></i>
        <i className="ri-arrow-left-s-line ri-xl" onClick={getBack}></i>
        <i className="ri-arrow-right-s-line ri-xl" onClick={toTheNext}></i>
        <div
          className={`card-reviewed ${flip ? "flip" : ""}`}
          onClick={flipCard}
        >
          <div
            className={`card-body_reviewed ${currentCard.type}`}
            style={{ height: height }}
          >
            <div
              className="front"
              style={{ visibility: flip ? "hidden" : "visible" }}
              ref={frontEl}
            >
              {count === 0 ? currentCard.question : newCurrentCard.question}
            </div>
            <div
              className="back"
              style={{ visibility: flip ? "visible" : "hidden" }}
              ref={backEl}
            >
              {count === 0 ? currentCard.answer : newCurrentCard.answer}
            </div>
          </div>
          <div className="card-check-box" ref={checkEl}>
            <div className={`check_card ${flip ? "back" : "front"}`}>
              <i className="ri-close-line ri-xl"></i>
              <img
                src={rotateIcon}
                alt="rotate icon"
                className="rotate-icon"
                onClick={flipCard}
              />
              <i className="ri-check-line ri-xl"></i>
            </div>
          </div>
        </div>
      </StyledReviewCard>
    </StyledPopUpBackdrop>
  );
};
export default ReviewCard;
