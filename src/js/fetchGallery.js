export default class APIservice {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchGallery() {
        const options = {
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
}
    const key = '30384018-2d39d03273dba06700386baf1';
    const url = `https://pixabay.com/api/?key=${key}&q=${this.searchQuery}&page=${this.page}&per_page=40`;

       return fetch(url, options)
            .then(r => r.json())
           .then(data => {
                this.addPage();
                return data.hits;
            });
    }

    addPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
    return this.searchQuery;
    }
    
    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
}