import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../Context";

import defaultImage from "../images/default-image.jpg";
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
  padding: 30px;
  height: fit-content;
  width: fit-content;
  background: #d62828;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export default function NewEnglishDeck() {
  const {
    img,
    setImg,
    res,
    setRes,
    isCreated,
    setImgURL,
    newDeckName,
    setNewDeckName,
    createNewEnglishDeck,
  } = useContext(Context);

  function fetchRequest() {
    fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=fFUIhUac_dcGkSteRiTukU1IB0DYzbKJwJq1sx1EsVk&per_page=1
      `
    )
      .then((res) => res.json())
      .then((data) => setRes(data.results));
    console.log(res);
  }

  function getImage() {
    const getImg = res.map((val) => {
      setImgURL(val.urls.small);
      return (
        <>
          <img
            key={val.user.id}
            id={val.user.id}
            className="deck-image"
            src={val.urls.small}
            alt={val.description}
          />
        </>
      );
    });
    return getImg;
  }

  useEffect(fetchRequest, []);

  function submit(e) {
    e.preventDefault();
    fetchRequest();
    setImg("");
    console.log(img);
  }

  return (
    <StyledPopUpBackdrop
      id="backdrop_create-englishDeck"
      className={isCreated ? "show_new-deck" : ""}
    >
      <StyledCreateDeck id="popup_create-englishDeck">
        <div className="create-deck">
          <div className="image-box">
            {res.length > 0 ? (
              getImage()
            ) : (
              <img
                src={defaultImage}
                alt="This is default"
                className="default-img"
              />
            )}
          </div>
          <div className="search-box">
            <input
              className="search-image"
              type="text"
              placeholder="Search Image ..."
              value={img}
              onChange={(e) => setImg(e.target.value)}
            ></input>
            <button type="submit" className="search-button" onClick={submit}>
              Search
            </button>
          </div>
          <input
            className="deck-title"
            placeholder="Untitled"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
          ></input>
          <i
            className="ri-check-line ri-xl save-deck-btn"
            onClick={createNewEnglishDeck}
          ></i>
        </div>
      </StyledCreateDeck>
    </StyledPopUpBackdrop>
  );
}
