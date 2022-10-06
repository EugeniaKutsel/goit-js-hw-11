import axios from "axios";

const API_KEY = '30384018-2d39d03273dba06700386baf1';

export default class ApiService{
    constructor() {
    this.search = '';
    this.page = 1;
    }
    
    async fetchGallery() {
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: API_KEY,
          q: `${this.search}`,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: `${this.page}`,
        },
      });
      this.addPage();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  addPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.search;
  }

  set query(newQuery) {
    this.search = newQuery;
  }
}