window.addEventListener('DOMContentLoaded', event => {
      // document.querySelector('.search-category-selector').addEventListener('change', (event) => {
  //   console.log(event.target.value);
  // });

    const categorySelect = document.querySelector('.search-category-selector');
    categorySelect.addEventListener('change', (event) => {
        if (event.target.value) document.location.href = `/searchresults/${event.target.value}`;
    });
})