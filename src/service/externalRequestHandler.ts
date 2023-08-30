import { RandomNumberResponse } from './RandomNumberResponse';
import axios, { AxiosPromise } from 'axios';
export const externalRequestHandler = async (
  url: string,
): AxiosPromise<RandomNumberResponse[]> => {
  return await axios.get(url);
};
