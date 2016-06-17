var searchResultDetails;

function OmdbSearchResults(params) {
  var target = params.target;
  var itemData = {};
  var itemType;
  searchResultDetails = new SearchResultDetails();

  bindEvents();

  return {
    setData: setData
  }

  function setData(data, type) {
    itemType = type
    render(data);
  }

  function render(data) {
    $(target).empty();
    if (data) {
      $(target).append(buildHtml(data));
      $('.collapsible').collapsible({
        accordion : false
      });
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

  function bindEvents() {
    $(target).on('click', '.collapsible-header', function() {
      renderItemDetails($(this));
    });
  }

  function renderItemDetails($selectedHeader) {
    var id = $selectedHeader.attr('data-item-id');
    var $selectedBody = $selectedHeader.siblings('.collapsible-body');
    if ($selectedBody.children().length === 0) {
      searchResultDetails.setData({ data: itemData[id], target: $selectedBody, type: itemType });
    }
  }
}
