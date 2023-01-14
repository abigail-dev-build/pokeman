/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useReducer, useContext } from "react";
import { INITIAL_STATE, postReducer } from "../postReducer";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

function SingleCard({ cards, key, url }) {
  const router = useRouter();
  const cookies = new Cookies();
  const [cardDetails, setcardDetails] = useState([]);

  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  useEffect(() => {
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        setcardDetails(res?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const openSingleCard = (cardImage, cardStat) => {
    cookies.set("image", cardImage);
    cookies.set("stats", JSON.stringify(cardStat));
    dispatch({ type: "SET_IMAGE", payload: cardImage });
    router.push({ pathname: "/single-card", query: { image: cardImage } });
  };
  return (
    <div
      key={key}
      className="w-80 h-96 border border-solid border-grey mb-3 hover:bg-offGray group cursor-pointer rounded"
      onClick={() =>
        openSingleCard(cardDetails?.sprites?.back_shiny, cardDetails?.stats)
      }
    >
      <p className="text-center pt-4 text-lg text-white group-hover:text-dark">
        {cards?.name}
      </p>
      <img
        src={cardDetails?.sprites?.back_shiny}
        alt=""
        className="w-full h-5/6 object-cover"
      />
    </div>
  );
}

export default SingleCard;
