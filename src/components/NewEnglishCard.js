import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import QuestionEditor from "./QuestionEditor";
import AnswerEditor from "./AnswerEditor";

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
  &.show_new-card {
    display: flex;
  }
`;
const StyledCreateCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding-top: 25px;
  padding-bottom: 5px;
  padding-left: 40px;
  padding-right: 40px;
  height: fit-content;
  width: fit-content;
  background: #d62828;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const NewEnglishCard = () => {
  const {
    isCreated,
    setIsCreated,
    moveForward,
    setMoveForward,
    createNewEngCard,
  } = useContext(Context);

  function closeEnglishEditorEl() {
    setMoveForward(false);
    setIsCreated(false);
  }

  return (
    <StyledPopUpBackdrop
      id="backdrop_create-englishCard"
      className={isCreated ? "show_new-card" : ""}
    >
      <StyledCreateCard id="popup_create-englishCard">
        <i className="ri-close-fill ri-xl" onClick={closeEnglishEditorEl}></i>
        <i
          className="ri-arrow-left-s-line ri-xl"
          onClick={() => setMoveForward(false)}
        ></i>
        <i
          className="ri-arrow-right-s-line ri-xl"
          onClick={() => setMoveForward(true)}
        ></i>
        <div className="create-card">
          {!moveForward ? <QuestionEditor /> : <AnswerEditor />}
        </div>
        <div className="save-btn_box">
          <button className="save-btn" onClick={createNewEngCard}>
            save
          </button>
        </div>
      </StyledCreateCard>
    </StyledPopUpBackdrop>
  );
};
export default NewEnglishCard;
