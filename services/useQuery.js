import { useQuery } from 'react-query';
import { getCards } from './endpoints';

const QueryCards = () => useQuery("card", () => getCards());

export default QueryCards;