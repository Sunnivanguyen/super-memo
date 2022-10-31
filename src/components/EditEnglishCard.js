import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import NewAnswerEditor from "./NewAnswerEditor";
import NewQuestionEditor from "./NewQuestionEditor";
import Editor from "./NewQuestionEditor";

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
  &.show_edit-card {
    display: flex;
  }
`;
const StyledEditCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding: 20px 40px;
  height: fit-content;
  width: fit-content;
  background: #d62828;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const EditEnglishCard = ({ item }) => {
  const {
    isEdited,
    setIsEdited,
    moveForward,
    setMoveForward,
    currentEngCardId,
    updatedQuestion,
    updatedAnswer,
    setEnglishCards,
  } = useContext(Context);

  function updateEnglishCard(event) {
    event.stopPropagation();
    setIsEdited(false);
    console.log("current card id: " + currentEngCardId);

    setEnglishCards((oldCards) =>
      oldCards.map((oldCard) =>
        oldCard.id === currentEngCardId
          ? { ...oldCard, question: updatedQuestion, answer: updatedAnswer }
          : oldCard
      )
    );
  }

  function closeEnglishEditorEl() {
    setMoveForward(false);
    setIsEdited(false);
  }
  return (
    <StyledPopUpBackdrop
      id="backdrop_edit-englishCard"
      className={isEdited ? "show_edit-card" : ""}
    >
      <StyledEditCard id="popup_edit-englishCard">
        <i className="ri-close-fill ri-xl" onClick={closeEnglishEditorEl}></i>
        <i
          className="ri-arrow-left-s-line ri-xl"
          onClick={() => setMoveForward(false)}
        ></i>
        <i
          className="ri-arrow-right-s-line ri-xl"
          onClick={() => setMoveForward(true)}
        ></i>
        <div className="editor">
          {!moveForward ? (
            <NewQuestionEditor item={item} />
          ) : (
            <NewAnswerEditor item={item} />
          )}
        </div>
        <div className="save-btn_box">
          <button
            className="save-btn"
            onClick={(event) => updateEnglishCard(event)}
          >
            save
          </button>
        </div>
      </StyledEditCard>
    </StyledPopUpBackdrop>
  );
};
export default EditEnglishCard;
