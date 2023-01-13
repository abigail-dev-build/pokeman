import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const INITIAL_STATE = {
  pokemonImage: cookies.get('image') || '',
  stats: cookies.get('stats') || {},
  details: {
    id: 1,
    sprites: {}
  }
}

export const postReducer = (state, action) => {
switch(action.type) {
  case "SET_IMAGE": 
  return {
    ...state,
    pokemonImage: action.payload
  }
  case "SET_CARD_STATS":
    return {
      ...state,
      stats: action.payload,
    }
    default: 
    return state;
}
}