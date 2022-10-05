import APIservice from "./js/fetchGallery";
import hitsTpl from "./templates/hits.hbs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}

const apiService = new APIservice();
const lightbox = new SimpleLightbox('.gallery__item');

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


async function onSearchForm(e) {
    e.preventDefault();
    clearGallerry();

    apiService.resetPage();
    apiService.query = e.currentTarget.elements.searchQuery.value;
    if (apiService.query === '') {
        chekInput();
        return;
    }
    
    try {
        const result = await apiService.fetchGallery();
        appendGalleryMarkup(result);
        
        scrollTo();
        apiService.setTotalHits(result.totalHits); 

        lightbox.refresh();
        
        Notiflix.Notify.success(`Hooray! We found ${apiService.totalHits} images.`);
        onShowLoadMoreBtn();
        onLastPhotos();
    }

    catch (error) {
    Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    );
    }
}

async function onLoadMore() {
    const result = await apiService.fetchGallery();
    appendGalleryMarkup(result);
    lightbox.refresh();

    scrollTo();
    onLastPhotos();
    apiService.lastTotalHits();
}

function appendGalleryMarkup(markup) {
    refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(markup));
}

function clearGallerry() {
    refs.gallery.innerHTML = '';
}

function onShowLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}
function hideShowMoreBtn() {
    refs.loadMoreBtn.classList.add('is-hidden');
}

function chekInput() {
    Notiflix.Notify.failure('Sorry! You have to enter something.Please, try again!') 
    hideShowMoreBtn();
    apiService.resetPage(); 
    }
   
function onLastPhotos() {
        if (apiService.totalHits <= 40) {
    hideShowMoreBtn();
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
    return;
  }
    }

function scrollTo() {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
});
}