/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useReducer, useContext, useEffect } from "react";
import { INITIAL_STATE, postReducer } from "../postReducer";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from 'universal-cookie'
import Characteristics from "./characteristics";

function SingleCardTemplate() {
  const router = useRouter();
  const cookies = new Cookies();
  const [checkSingleStat, setcheckSingleStat] = useState(null);
  const [baseTotal, setBaseTotal] = useState(0);
  const [checkCharacteristics, setCheckCharacteristics] = useState([]);

  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  let base_total = 0;
  useEffect(() => {
    state?.stats?.map((obj) => {
      base_total += obj.base_stat;
    }, setBaseTotal(base_total));
  }, []);

  const goBack = () => {
    cookies.remove('data');
    router.back()
  }

  return (
    <div className="bg-dark h-screen">
      <div className="sm: px-12 lg:pt-20">
        <h1 className="text-center mb-8 font-bold text-3xl text-darkGray">CARD STATISTICS</h1>
        <div className="flex justify-between">
          <div className="w-2/5 h-[498px] border border-solid border-grey rounded">
            <img
              src={state?.pokemonImage}
              alt=""
              className="w-full h-5/6 object-cover"
            />
          </div>
          <div className="w-3/5 min-h-96 border border-solid border-grey ml-12 rounded px-12 py-12 flex justify-between">
            <div>
              <h3 className="mb-6 text-grey">Base Stat: {baseTotal}</h3>
              {state?.stats?.map((newObj, index) => {
                const getStat = () => {
                  axios({
                    method: "get",
                    url: newObj.stat.url,
                  })
                    .then((res) => {
                      setcheckSingleStat(res?.data);
                      setCheckCharacteristics(res?.data?.characteristics);
                    })
                    .catch((error) => console.log(error));
                };
                return (
                  <div className="flex justify-between mb-3" key={index}>
                    <p className="text-grey" onClick={getStat}>
                      Name:{" "}
                      <span className="decoration-1 text-blue cursor-pointer">
                        {newObj.stat.name}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            {checkSingleStat !== null && (
              <div className="">
                <div className="border border-solid border-grey rounded w-[350px] min-h-[300px] px-5 py-6">
                  <p className="text-grey">
                    Name:{" "}
                    <span className="font-bold">
                      {(checkSingleStat?.name).toUpperCase()}
                    </span>
                  </p>
                  {checkCharacteristics.map((char, index) => {
                    return <Characteristics key={index} char={char} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="flex justify-start mt-28 sm:px-12 lg:px-10">
        <button
          className="cursor-pointer bg-blue py-2 px-8 rounded text-white text-xl"
          onClick={goBack }
        >
          Back
        </button>
      </div> */}
    </div>
  );
}

export default SingleCardTemplate;
