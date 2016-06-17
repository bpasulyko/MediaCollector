var addItemModal;

function AddItemDropdown(params) {
  var target = params.target;
  render();
  bindEvents();

  function render() {
    $(target).append(buildHtml());
    addItemModal = new AddItemModal();
    $('.modal-trigger').leanModal();
  }

  function buildHtml() {
    return `
      <ul id="add-dropdown" class="red darken-3 dropdown-content">
        <li><a href="#add-item-modal" class="modal-trigger waves-effect" id="add-movie" data-type="movie">Movie</a></li>
        <li><a href="#add-item-modal" class="modal-trigger waves-effect" id="add-tv-show" data-type="tv">TV Show</a></li>
      </ul>
    `;
  }

  function bindEvents() {
    $('.dropdown-button').dropdown({
      belowOrigin: true,
      alignment: 'right'
    });

    $('.modal-trigger').on('click', function() {
      addItemModal.setType($(this).attr('data-type'));
    });
  }
}
