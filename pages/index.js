import React, { useEffect } from "react";
import QueryCards from "../services/useQuery";

import SingleCard from "../components/singleCard";

export default function Home() {
  const { data, isLoading, refetch } = QueryCards();
  const cardsArray = data?.data?.results;

  useEffect(() => {
    refetch()
  },[])

  return (
    <div className="sm: px-12 lg:px-10 pt-10 bg-dark">
      <h1 className="text-white font-extrabold text-5xl mb-10">POKÉMON</h1>
      {isLoading ? (
        "...loading"
      ) : (
        <div className="grid sm: grid-cols-1 lg:grid-cols-4 gap-4">
          {cardsArray?.map((cards) => {
            return (
              <SingleCard key={cards?.name} id={cards?.name} cards={cards} url={cards.url} refetch={refetch} />
            );
          })}
        </div>
      )}
    </div>
  );
}
