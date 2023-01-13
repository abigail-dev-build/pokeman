import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Characteristics({ key, char}) {
  const [eachCharacter, setEachCharacter] = useState({});
  console.log(eachCharacter);

//   useEffect(() => {
// axios({
//   method: "get",
//   url: char.url
// })
// .then((resp) => {
//   console.log(resp.data, '//////')
//   // dispatch({ type: "SET_CARD_", payload: cardInfo?.stats });
// }
// )
// .catch((err) => console.log(err));
//   }, [])

  const checkUrl = () => {
    axios({
      method: "get",
      url: char.url
    })
    .then((res) => setEachCharacter(res.data))
    .catch((err) => console.log(err));
  }
  return (
    <div key={key}>
    
      <p onClick={checkUrl} className="decoration-1 text-blue cursor-pointer">{char.url}</p>
      
        <p className='text-grey'>Gene Modulo: {eachCharacter?.gene_modulo}</p>
        <ul className='text-grey'>Posible Values: {eachCharacter?.possible_values?.map((values, idx) => <li key={idx}>{values}</li>)}</ul>
      
  </div>
  )
}

export default Characteristics