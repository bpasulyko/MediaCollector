function SearchResultDetails() {
  var $target;
  var data;

  return {
    setData: setData
  }

  function setData(params) {
    $target = params.target;
    data = params.data;

    $target.append(buildItemDetails());
    $('select').material_select();
    bindEvents();
  }

  function buildItemDetails() {
    return `
      <div class="row">
        <div class="col s3 center">
          <img src="${data.Poster}" />
        </div>
        <div class="col s9">
          <h4>${data.Title} (${data.Year})</h4>
          <span>${data.Plot}</span>
          <div class="row result-detals-footer">
            <div class="additional-options left">
              ${renderAdditionalOptions()}
            </span>
            <button id="add-item-button" class="right btn-floating waves-effect red darken-4 white-text" data-id="${data.imdbID}"><i class="material-icons">add</i></button>
          </div>
        </div>
      </div>
    `;
  }

  function renderAdditionalOptions() {
    if (data.Type === 'movie') {
      return `<input type="checkbox" id="watched" /><label for="watched">Watched?</label>`;
    } else if (data.Type === 'series') {
      return `
        <input name="tv-show-group" type="radio" id="in-progress" /><label for="in-progress">In Progress</label>
        <input name="tv-show-group" type="radio" id="completed" /><label for="completed">Completed?</label>
      `;
    } else if (data.Type === 'game') {
      return `
        <div class="input-field">
          <select>
            <option value="" disabled selected>Choose your option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <label>Platform</label>
        </div>
        <input name="tv-show-group" type="radio" id="in-progress" /><label for="in-progress">In Progress</label>
        <input name="tv-show-group" type="radio" id="completed" /><label for="completed">Completed?</label>
      `
    }
  }

  function bindEvents() {
    $target.on('click', '#add-item-button', function () {
      var id = $(this).attr('data-id');
      saveItem();
    });
  }

  function saveItem() {
    var saveData = {
      type: data.Type,
      itemData: {
        id: data.imdbID,
        title: data.Title,
        year: data.Year,
        genre: data.Genre,
        poster: data.Poster
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
          Materialize.toast(`${data.Title} added successfully!`, 5000, 'rounded');
        }
      }
    });
  }
}
