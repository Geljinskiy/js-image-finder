import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios, { Axios } from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '30328411-b65b8d89f7679f3f92fb1ff1e';
const SETS = '?image_type=photo&safesearch=true&orientation=horizontal';

export let per_page = 40;

export const pagination = {
  targetSearch: false,
  page: 1,

  resetPageValue() {
    this.page = 1;
  },
};

export async function fetchImages(query) {
  try {
    const response = await axios.get(
      `${URL}${SETS}&q=${query}&key=${KEY}&page=${pagination.page}&per_page=${per_page}`
    );

    pagination.targetSearch = query;

    return response.data;
  } catch (er) {
    Notify.failure(er);
  }
}
