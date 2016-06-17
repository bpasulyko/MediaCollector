var tmdbSearch;

function AddItemModal() {
  tmdbSearch = new TmdbSearch({ target: '#modal-search-form' });

  return {
    setType: setType
  }

  function setType(type) {
    tmdbSearch.setInputType(type);
  }
}
