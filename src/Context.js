import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [chosenLanguage, setChosenLanguage] = useState(false);
  const [englishDecks, setEnglishDecks] = useState(
    JSON.parse(localStorage.getItem("englishCard_sets")) || []
  );
  const [newDeckId, setNewDeckId] = useState("");
  const [currentEnglishDeckId, setCurrentEnglishDeckId] = useState("");
  const [currentChineseDeckId, setCurrentChineseDeckId] = useState("");
  const [newDeckName, setNewDeckName] = useState("");
  const [updatedDeckName, setUpdatedDeckName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [englishCards, setEnglishCards] = useState(
    JSON.parse(localStorage.getItem("english_cards")) || []
  );
  const [chineseCards, setChineseCards] = useState(
    JSON.parse(localStorage.getItem("chinese_cards")) || []
  );
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newCardId, setNewCardId] = useState("");
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [updatedAnswer, setUpdatedAnswer] = useState("");

  const [currentEngCardId, setCurrentEngCardId] = useState(
    (englishCards[0] && englishCards[0].id) || ""
  );
  const [currentChineseCardId, setCurrentChineseCardId] = useState(
    (chineseCards[0] && chineseCards[0].id) || ""
  );
  React.useEffect(() => {
    localStorage.setItem("englishCard_sets", JSON.stringify(englishDecks));
    localStorage.setItem("english_cards", JSON.stringify(englishCards));
    localStorage.setItem("chinese_cards", JSON.stringify(chineseCards));
  }, [
    englishCards,
    chineseCards,
    question,
    answer,
    newCardId,
    updatedAnswer,
    updatedQuestion,
    englishDecks,
  ]);
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);

  function createNewEnglishDeck() {
    setIsCreated(false);
    const newEngDeck = {
      id: newDeckId,
      type: "english_set",
      name: newDeckName,
      image: imgURL,
      cards: englishCards,
    };
    setEnglishDecks((prevDecks) => [newEngDeck, ...prevDecks]);
    setCurrentEnglishDeckId(newDeckId);
    console.log(newEngDeck);
  }

  function createNewDeck() {
    setIsCreated(true);
    setNewDeckId(nanoid());
    setNewDeckName("");
    if (chosenLanguage === "english") {
      setCurrentEnglishDeckId(newCardId);
    } else if (chosenLanguage === "chinese") {
      setCurrentChineseDeckId(newCardId);
    }
  }

  function createNewEngCard() {
    setIsCreated(false);
    const newEngCard = {
      id: newCardId,
      type: "english_card",
      question: question,
      answer: answer,
    };
    setEnglishCards((prevCards) => [newEngCard, ...prevCards]);
    setCurrentEngCardId(newEngCard.id);
    console.log("english " + englishCards);
  }

  function createNewChineseCard() {
    setIsCreated(false);
    const newChineseCard = {
      id: newCardId,
      type: "chinese_card",
      question: question,
      answer: answer,
    };
    setChineseCards((prevCards) => [newChineseCard, ...prevCards]);
    setCurrentChineseCardId(newChineseCard.id);
    console.log("chinese " + chineseCards);
  }

  function createNewCard() {
    setIsCreated(true);
    setNewCardId(nanoid());
    setQuestion("");
    setAnswer("");
    setMoveForward(false);
    if (chosenLanguage === "english") {
      setCurrentEngCardId(newCardId);
    } else if (chosenLanguage === "chinese") {
      setCurrentChineseCardId(newCardId);
    }
  }

  function editCard(event, cardId, cardQuestion, cardAnswer) {
    event.stopPropagation();
    setIsEdited(true);
    setUpdatedQuestion(cardQuestion);
    setUpdatedAnswer(cardAnswer);
    setMoveForward(false);
    if (chosenLanguage === "english") {
      setCurrentEngCardId(cardId);
    } else if (chosenLanguage === "chinese") {
      setCurrentChineseCardId(cardId);
    }
    console.log(cardQuestion);
  }
  function reviewCard(event, cardId) {
    event.stopPropagation();
    setIsReviewed(true);
    if (chosenLanguage === "english") {
      setCurrentEngCardId(cardId);
    } else if (chosenLanguage === "chinese") {
      setCurrentChineseCardId(cardId);
    }
  }
  function findCurrentCard() {
    if (chosenLanguage === "english") {
      return englishCards.find((card) => {
        return card.id === currentEngCardId;
      });
    } else if (chosenLanguage === "chinese") {
      return chineseCards.find((card) => {
        return card.id === currentChineseCardId;
      });
    }
  }
  const [moveForward, setMoveForward] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (document.getElementById("backdrop_review-card")) {
      document.getElementById("backdrop_review-card").addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          console.log("1");
        },
        false
      );
    }
    if (document.getElementById("popup_review-card")) {
      document.getElementById("popup_review-card").addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          console.log("2");
        },
        false
      );
    }
    if (document.getElementById("backdrop_edit-englishCard")) {
      document.getElementById("backdrop_edit-englishCard").addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          console.log("3");
        },
        false
      );
    }
    if (document.getElementById("popup_edit-englishCard")) {
      document.getElementById("popup_edit-englishCard").addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          console.log("4");
        },
        false
      );
    }
    if (document.getElementById("backdrop_edit-chineseCard")) {
      document.getElementById("backdrop_edit-chineseCard").addEventListener(
        "click",
        (e) => {
          e.stopPropagation("5");
        },
        false
      );
    }
    if (document.getElementById("popup_edit-chineseCard")) {
      document.getElementById("popup_edit-chineseCard").addEventListener(
        "click",
        (e) => {
          e.stopPropagation("6");
        },
        false
      );
    }
    if (document.getElementById("backdrop_create-englishCard")) {
      document.getElementById("backdrop_create-englishCard").addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          console.log("7");
        },
        false
      );
    }
    if (document.getElementById("popup_create-englishCard")) {
      document.getElementById("popup_create-englishCard").addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          console.log("8");
        },
        false
      );
    }
    if (document.getElementById("backdrop_create-chineseCard")) {
      document.getElementById("backdrop_create-chineseCard").addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          console.log("9");
        },
        false
      );
    }
    if (document.getElementById("popup_create-chineseCard")) {
      document.getElementById("popup_create-chineseCard").addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          console.log("9");
        },
        false
      );
    }
  }, []);

  const [input, setInput] = useState("");
  const [currentKeyValue, setCurrentKeyValue] = useState("");

  return (
    <Context.Provider
      value={{
        chosenLanguage,
        setChosenLanguage,
        englishDecks,
        setEnglishDecks,
        englishCards,
        setEnglishCards,
        chineseCards,
        setChineseCards,
        isReviewed,
        setIsReviewed,
        reviewCard,
        isEdited,
        setIsEdited,
        isCreated,
        setIsCreated,
        createNewEngCard,
        createNewChineseCard,
        findCurrentCard,
        moveForward,
        setMoveForward,
        currentEngCardId,
        setCurrentEngCardId,
        currentChineseCardId,
        setCurrentChineseCardId,
        question,
        answer,
        setQuestion,
        setAnswer,
        createNewCard,
        updatedQuestion,
        setUpdatedQuestion,
        updatedAnswer,
        setUpdatedAnswer,
        editCard,
        input,
        setInput,
        currentKeyValue,
        setCurrentKeyValue,
        createNewDeck,
        img,
        setImg,
        res,
        setRes,
        imgURL,
        setImgURL,
        newDeckName,
        setNewDeckName,
        createNewEnglishDeck,
        currentEnglishDeckId,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
export { ContextProvider, Context };
