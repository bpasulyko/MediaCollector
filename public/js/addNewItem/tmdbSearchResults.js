var searchResultDetails;

function TmdbSearchResults(params) {
  var target = params.target;
  var itemData = {};
  var itemType;
  var searchString;
  searchResultDetails = new SearchResultDetails();

  bindEvents();

  return {
    setData: setData
  }

  function setData(params) {
    var data = params.data;
    itemType = params.type;
    searchString = params.search;
    render(data);
  }

  function render(data) {
    $(target).empty();
    if (data && data.length > 0) {
      $(target).append(buildHtml(data));
      $('.collapsible').collapsible({
        accordion : false
      });
    } else if (searchString) {
      $(target).append(buildNoResults());
    }
  }

  function buildHtml(data) {
    var htmlString = '<ul class="collapsible popout" data-collapsible="accordion">';
    data.forEach(function (item) {
      itemData[item.id] = item;
      var year = itemType === 'movie' ? item.release_date.split('-')[0] : item.first_air_date.split('-')[0];
      var title = itemType === 'movie' ? item.title : item.name;
      htmlString += `
        <li class="white black-text">
          <div class="collapsible-header" data-item-id="${item.id}"><span class="movie-title">${title}</span> (${year})</div>
          <div class="collapsible-body"></div>
        </li>
      `;
    });

    return htmlString += '</ul>';
  }

  function buildNoResults() {
    return `
      <div class="no-results">
        <h6 class="center">No search results found!</h6>
      </div>
    `;
  }

  function bindEvents() {
    $(target).on('click', '.collapsible-header', function() {
      renderItemDetails($(this));
    });
  }

  function renderItemDetails($selectedHeader) {
    var id = $selectedHeader.attr('data-item-id');
    var $selectedBody = $selectedHeader.siblings('.collapsible-body');
    if ($selectedBody.children().length === 0) {
      getImages(id, $selectedBody);
    }
  }

  function getImages(id, target) {
    var url = window.mainUrl + itemType + '/' + id + '/images?api_key=' + window.apiKey + '&language=en';
    $.ajax({
      url: url,
      type: 'GET',
      datatype: 'json',
      success: function(result) {
        searchResultDetails.setData({ data: itemData[id], target: target, type: itemType, imageData: result });
      }
    });
  }
}
