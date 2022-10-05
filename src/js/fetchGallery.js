import axios from "axios";

export default class APIservice {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = null;
    }

    async fetchGallery() {
    const API_KEY = '30384018-2d39d03273dba06700386baf1';
    const BASE_URL = 'https://pixabay.com';
    const response =  await axios(`${BASE_URL}/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&per_page=40&page=${this.page}`)
        if (!response.data.total) {
            throw new Error('error');
        }
        this.page += 1;
                const { hits, totalHits } = response.data;
                return { hits, totalHits };
            }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    setTotalHits(hits) {
    this.totalHits = hits;
  }

    lastTotalHits() {
    this.totalHits -= 40;
  }
    }