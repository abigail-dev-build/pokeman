import axios from 'axios';

const baseURL = 'https://pokeapi.co/api/v2';

export const getCards = async () => axios.get(`${baseURL}/pokemon?limit=151`);