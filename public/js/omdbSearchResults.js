function OmdbSearchResults(params) {
  var target = params.target;
  var itemData = {};

  bindEvents();

  return {
    setData: setData
  }

  function setData(data) {
    render(data);
  }

  function render(data) {
    itemDate = {};
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
      var $selectedHeader = $(this);
      var $selectedBody = $(this).siblings('.collapsible-body');
      var data = {
        title: $(this).find('.movie-title').text(),
      };
      if ($selectedBody.children().length === 0) {
        getItemData(data, $selectedBody);
      }
    });

    $(target).on('click', '#add-item-button', function () {
      var id = $(this).attr('data-id');
      saveItem(itemData[id]);
    });
  }

  function getItemData(data, $selectedBody) {
    $.ajax({
      url: '/getItem',
      type: 'POST',
      data: data,
      datatype: 'json',
      success: function(result) {
        result = JSON.parse(result);
        itemData[result.imdbID] = result;
        $selectedBody.append(buildItemDetails(result));
      }
    });
  }

  function buildItemDetails(item) {
    return `
      <div class="row">
        <div class="col s3 center">
          <img src="${item.Poster}" />
        </div>
        <div class="col s9">
          <h4>${item.Title} (${item.Year})</h4>
          <span>${item.Plot}</span>
          <div class="row result-detals-footer right">
            <span>
              <input type="checkbox" id="watched" />
              <label for="watched">Watched?</label>
            </span>
            <span>
              <button id="add-item-button" class="btn-floating waves-effect red darken-4 white-text" data-id="${item.imdbID}"><i class="material-icons">add</i></button>
            </span>
          </div>
        </div>
      </div>
    `;
  }

  function saveItem(item) {
    var data = {
      type: item.Type,
      itemData: {
        id: item.imdbID,
        title: item.Title,
        year: item.Year,
        poster: item.Poster
      }
    }
    $.ajax({
      url: '/saveItem',
      type: 'POST',
      data: data,
      datatype: 'json',
      success: function(result) {
        if (JSON.parse(result).ok) {
          $('#add-item-modal').closeModal();
          Materialize.toast(`${item.Title} added successfully!`, 5000, 'rounded');
        }
      }
    });
  }
}
