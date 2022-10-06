import './css/styles.css';
import axios from 'axios';
import { renderGallery } from './js/renderGallery';
import ApiService from './js/fetchGallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiService = new ApiService();

const lightbox = new SimpleLightbox('.gallery a');

let currentHits = 0;

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
hideBtn();

function onSearchForm(e) {
  e.preventDefault();
  try {
    hideBtn();
    apiService.query = e.target.elements.searchQuery.value;
    apiService.resetPage();
    apiService.fetchGallery().then(({ hits, totalHits }) => {
      clearGallery();
      currentHits = hits.length;

      if (totalHits === 0 || apiService.query === '') {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        appendGalleryMarkup(hits);
        lightbox.refresh();

      if (currentHits === totalHits) {
        return;
      }
      showBtn();
    });
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  hideBtn();
  apiService.fetchGallery().then(({ hits, totalHits }) => {
      appendGalleryMarkup(hits);
      onScroll();
    lightbox.refresh();
    showBtn();
    currentHits += hits.length;

    if (currentHits === totalHits) {
      Notiflix.Notify.failure('Were sorry, but youve reached the end of search results.');
      hideBtn();
    }
  });
}

function appendGalleryMarkup(hits) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    renderGallery(hits)
  );
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function hideBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function showBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function onScroll() {
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}