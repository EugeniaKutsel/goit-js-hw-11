import APIservice from "./js/fetchGallery";
import hitsTpl from "./templates/hits.hbs";

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}

const apiService = new APIservice();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchForm(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.searchQuery.value;
    apiService.resetPage();
    apiService.fetchGallery().then(appendGalleryMarkup);
}

function onLoadMore() {
    apiService.fetchGallery().then(appendGalleryMarkup);
}

function appendGalleryMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));
}