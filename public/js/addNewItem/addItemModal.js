var omdbSearch;

function AddItemModal() {
  omdbSearch = new OmdbSearch({ target: '#modal-search-form' });

  return {
    setType: setType
  }

  function setType(type) {
    omdbSearch.setInputType(type);
  }
}
