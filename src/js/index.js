import { fetchImages, pagination, per_page } from './fetchImages';
import { makeLayout } from './makeLayout';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const subBtn = document.querySelector('.submit-button');
const gallery = document.querySelector('.gallery');
const namePhoto = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');

subBtn.addEventListener('click', onSubmitClick);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onLoadMoreClick(ev) {
  ev.preventDefault;
  pagination.page += 1;
  loadMoreBtn.classList.add('is-hidden');

  try {
    const findedImages = await fetchImages(pagination.targetSearch);
    console.log(findedImages);
    if (findedImages.hits.length === per_page) {
      loadMoreBtn.classList.remove('is-hidden');
    }
    if (findedImages.hits.length < per_page) {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
    createLoadedPictures(findedImages.hits);
  } catch (error) {
    Notify.failure(er);
  }
}

async function onSubmitClick(ev) {
  ev.preventDefault(ev);
  const prevSearch = pagination.targetSearch;

  if (namePhoto.value === prevSearch) {
    return;
  }

  try {
    pagination.page = 1;

    const findedImages = await fetchImages(namePhoto.value);

    if (findedImages.total === 0) {
      loadMoreBtn.classList.add('is-hidden');
      gallery.innerHTML = '';
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notify.success(`Hooray! We found ${findedImages.total} images.`);

    gallery.innerHTML = getImageParams(findedImages.hits);

    if (findedImages.hits.length === per_page) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (er) {
    Notify.failure(er);
  }
}

function createLoadedPictures(finded) {
  const markup = finded
    .map(el => {
      const imageParams = {
        src: el.webformatURL,
        alt: el.tags,
        likes: el.likes,
        views: el.views,
        comments: el.comments,
        downloads: el.downloads,
      };
      return makeLayout(imageParams);
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function getImageParams(fetchedData) {
  return fetchedData
    .map(el => {
      const imageParams = {
        src: el.webformatURL,
        alt: el.tags,
        likes: el.likes,
        views: el.views,
        comments: el.comments,
        downloads: el.downloads,
      };
      return makeLayout(imageParams);
    })
    .join('');
}

subBtn.addEventListener('click', () => {
  subBtn.classList.toggle('submit-button__clicked');
  setTimeout(() => {
    subBtn.classList.toggle('submit-button__clicked');
  }, 200);
});
