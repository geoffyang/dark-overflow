window.addEventListener('DOMContentLoaded', event => {
 
    const categorySelect = document.querySelector('.search-category-selector');
    categorySelect.addEventListener('change', (event) => {
        if (event.target.value) document.location.href = `/searchresults/${event.target.value}`;
    });
})