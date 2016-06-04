var OmdbSearchResults;

function OmdbSearch(params) {
  var target = params.target;
  var type;
  OmdbSearchResults = new OmdbSearchResults({ target: '#modal-search-results' });

  bindEvents();

  return {
    setInputType: setInputType
  }

  function setInputType(selectedType) {
    type = selectedType;
    render();
    OmdbSearchResults.setData();
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
        <button id="search-button" class="btn waves-effect right">GO</button>
      </form>
    `;
  }

  function bindEvents() {
    $(target).on('click', '#search-button', function(e) {
      e.preventDefault();
      var data = {
        query: $(this).siblings().find('input').val(),
        type: type
      };
      $.ajax({
        url: '/search',
        type: 'POST',
        data: data,
        datatype: 'json',
        success: function(result) {
          OmdbSearchResults.setData(JSON.parse(result).Search)
        }
      });
    });
  }
}
