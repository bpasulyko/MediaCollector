var OmdbSearch;

function AddItemModal() {
  OmdbSearch = new OmdbSearch({ target: '#modal-search-form' });

  return {
    setType: setType
  }

  function setType(type) {
    OmdbSearch.setInputType(type);
  }
}
