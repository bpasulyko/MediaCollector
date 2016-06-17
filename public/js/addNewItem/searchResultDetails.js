function SearchResultDetails() {
  var $target;
  var data;
  var type;

  return {
    setData: setData
  }

  function setData(params) {
    $target = params.target;
    data = params.data;
    type = params.type;

    $target.append(buildItemDetails());
    bindEvents();
  }

  function buildItemDetails() {
    var imageUrl = window.config.images.base_url + window.config.images.poster_sizes[1] + data.poster_path;
    var year = type === 'movie' ? data.release_date.split('-')[0] : data.first_air_date.split('-')[0];
    var title = type === 'movie' ? data.title : data.name;
    return `
      <div class="row">
        <div class="col s3 center">
          <img src="${imageUrl}" />
        </div>
        <div class="col s9">
          <h4>${title} (${year})</h4>
          <span>${data.overview}</span>
          <div class="row result-details-footer right">
            <input type="checkbox" id="watched" /><label for="watched">Watched?</label>
            <button id="add-item-button" class="right btn-floating waves-effect red darken-4 white-text" data-id="${data.id}"><i class="material-icons">add</i></button>
          </div>
        </div>
      </div>
    `;
  }

  function bindEvents() {
    $target.on('click', '#add-item-button', function () {
      var watched = $(this).siblings('#watched').prop('checked');
      saveItem(watched);
    });
  }

  function saveItem(watched) {
    var itemTitle = type === 'movie' ? data.title : data.name;
    var saveData = {
      type: type,
      itemData: {
        id: data.id,
        title: itemTitle,
        release: type === 'movie' ? data.release_date : data.first_air_date,
        genre: data.genre_ids.join(','),
        poster: data.poster_path,
        watched: watched,
      }
    }

    $.ajax({
      url: '/saveItem',
      type: 'POST',
      data: saveData,
      datatype: 'json',
      success: function(result) {
        if (JSON.parse(result).ok) {
          $('#add-item-modal').closeModal();
          Materialize.toast(`${itemTitle} added successfully!`, 5000, 'rounded');
        }
      }
    });
  }
}
