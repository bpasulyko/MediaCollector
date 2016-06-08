var omdbSearchResults;

function OmdbSearch(params) {
  var target = params.target;
  var type;
  omdbSearchResults = new OmdbSearchResults({ target: '#modal-search-results' });

  bindEvents();

  return {
    setInputType: setInputType
  }

  function setInputType(selectedType) {
    type = selectedType;
    render();
    omdbSearchResults.setData();
  }

  function render() {
    $(target).empty();
    $(target).append(buildHtml());
  }

  function buildHtml() {
    return `
      <form class="col s12">
        <div class="input-field col s12">
          <input id="icon_prefix" type="text">
          <label for="icon_prefix">Search</label>
        </div>
        <button id="search-button" class="btn waves-effect red darken-1 white-text right"><i class="material-icons left">search</i> Search</button>
      </form>
    `;
  }

  function bindEvents() {
    $(target).on('click', '#search-button', function(e) {
      e.preventDefault();
      getItemDataBasedOnSearch($(this).siblings().find('input'));
    });
  }

  function getItemDataBasedOnSearch($inputField) {
    var data = {
      query: $inputField.val(),
    };
    if (type !== 'game') {
      data.type = type;
    }
    $.ajax({
      url: '/search',
      type: 'POST',
      data: data,
      datatype: 'json',
      success: function(result) {
        omdbSearchResults.setData(JSON.parse(result).Search)
      }
    });
  }
}
