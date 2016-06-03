var AddItemDropdown;

$(document).ready(function() {
  initializePageComponents();
});

function initializePageComponents() {
  AddItemDropdown = new AddItemDropdown({ target: '.nav-wrapper' });

  $(".main-nav-button").sideNav();
}
