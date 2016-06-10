var searchResultDetails;

function OmdbSearchResults(params) {
  var target = params.target;
  var itemData = {};
  searchResultDetails = new SearchResultDetails();

  bindEvents();

  return {
    setData: setData
  }

  function setData(data) {
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

    data.forEach(function (result) {
      htmlString += `
        <li class="white black-text">
          <div class="collapsible-header"><span class="movie-title">${result.Title}</span> (${result.Year})</div>
          <div class="collapsible-body"></div>
        </li>
      `;
    });

    return htmlString += '</ul>';
  }

  function bindEvents() {
    $(target).on('click', '.collapsible-header', function() {
      getItemData($(this));
    });
  }

  function getItemData($selectedHeader) {
    var $selectedBody = $selectedHeader.siblings('.collapsible-body');
    var data = {
      title: $selectedHeader.find('.movie-title').text(),
    };
    if ($selectedBody.children().length === 0) {
      $.ajax({
        url: '/getItem',
        type: 'POST',
        data: data,
        datatype: 'json',
        success: function(result) {
          searchResultDetails.setData({ data: JSON.parse(result), target: $selectedBody });
        }
      });
    }
  }
}
