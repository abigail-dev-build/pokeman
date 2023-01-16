/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from 'universal-cookie'
import Characteristics from "./characteristics";

function SingleCardTemplate() {
  const router = useRouter();
  const cookies = new Cookies();
  const [checkSingleStat, setcheckSingleStat] = useState(null);
  const [baseTotal, setBaseTotal] = useState(0);
  const [ref, setRef] = useState();
  const [checkCharacteristics, setCheckCharacteristics] = useState([]);

  const stats = cookies.get('stats')

  let base_total = 0;
  useEffect(() => {
    stats?.map((obj) => {
      base_total += obj.base_stat;
    }, setBaseTotal(base_total));
  }, []);

  useEffect(() => {
    if (router?.isReady && router?.query) {
      const cardImage = router?.query?.image;
      setRef(cardImage);
    }
  }, [router?.query, router?.isReady]);

  const goBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen sm: px-12 lg:px-10 pt-10 bg-dark">
      <div className="sm:px-12 lg:pt-20">
        <h1 className="text-center mb-8 font-bold text-3xl text-darkGray">CARD STATISTICS</h1>
        <div className="lg:flex sm:block lg:justify-between">
          <div className="lg:w-2/5 sm:w-full h-[498px] mb-8 border border-solid border-grey rounded">
            <img
              src={ref}
              alt=""
              className="w-full h-5/6 object-cover"
            />
          </div>
          <div className="lg:w-3/5 sm:w-full min-h-96 border border-solid border-grey lg:ml-12 sm:my-10 rounded px-12 lg:py-12 flex justify-between">
            <div>
              <h3 className="mb-6 text-grey">Base Stat: {baseTotal}</h3>
              {stats?.map((newObj, index) => {
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
              <div className="overscroll-contain">
                <div className="overscroll-auto border border-solid border-grey rounded w-[350px] min-h-[500px] px-5 py-6">
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

      <div className="flex justify-start pt-28 sm:px-12 lg:px-10">
        <button
          className="cursor-pointer bg-blue py-2 px-8 rounded text-white text-xl"
          onClick={goBack }
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default SingleCardTemplate;
