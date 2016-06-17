function SearchResultDetails() {
  var $target;
  var data;
  var type;
  var imageData;
  var currentImageIndex = 0;

  return {
    setData: setData
  }

  function setData(params) {
    $target = params.target;
    data = params.data;
    type = params.type;
    imageData = params.imageData;

    $target.append(buildItemDetails());
    bindEvents();
  }

  function buildItemDetails() {
    var imageUrl = window.config.images.base_url + window.config.images.poster_sizes[1] + imageData.posters[0].file_path;
    var year = type === 'movie' ? data.release_date.split('-')[0] : data.first_air_date.split('-')[0];
    var title = type === 'movie' ? data.title : data.name;
    return `
      <div class="row">
        <div class="col s3 center">
          <div id="change-picture-prev" class="change-picture"><i class="material-icons">skip_previous</i></div>
          <img src="${imageUrl}" title="1 of ${imageData.posters.length}" />
          <div id="change-picture-next" class="change-picture"><i class="material-icons">skip_next</i></div>
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

    $target.on('click', '.change-picture', function() {
      changeImage($(this));
    });
  }

  function changeImage($arrow) {
    var $image = $arrow.siblings('img');
    var direction = $arrow.find('i').text();
    currentImageIndex = (direction === 'skip_previous') ?
              (currentImageIndex === 0 ? imageData.posters.length - 1 : currentImageIndex - 1) :
              (currentImageIndex === imageData.posters.length - 1 ? 0 : currentImageIndex + 1);

    var imageUrl = window.config.images.base_url + window.config.images.poster_sizes[1] + imageData.posters[currentImageIndex].file_path;
    $image.attr('src', imageUrl);
    $image.attr('title', (currentImageIndex + 1) + ' of ' + imageData.posters.length);
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
        poster: imageData.posters[currentImageIndex].file_path,
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
