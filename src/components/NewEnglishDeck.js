import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";

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
  &.show_new-deck {
    display: flex;
  }
`;
const StyledCreateDeck = styled.div`
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

export default function NewEnglishDeck() {
  const { isCreated } = useContext(Context);

  function saveNewDeck() {
    isCreated(false);
  }
  return (
    <StyledPopUpBackdrop
      id="backdrop_create-englishDeck"
      className={isCreated ? "show_new-deck" : ""}
    >
      <StyledCreateDeck id="popup_create-englishDeck">
        <i className="ri-check-line ri-xl" onClick={saveNewDeck}></i>
        <div className="create-deck"></div>
      </StyledCreateDeck>
    </StyledPopUpBackdrop>
  );
}
