var addItemDropdown;

$(document).ready(function() {
  setupPageView();
  initializePageComponents();
});

function setupPageView() {
  var page = window.location.href.split('/').pop();
  if (page === 'movies') {
    initializeMoviePageView();
  } else if (page === 'tvshows') {
    initializeTvShowPageView();
  } else if (page === 'games') {
    initializeGamePageView();
  } else {
    initializeHomePageView();
  }
}

function initializeMoviePageView() {
  $('#main').append('<h1>MOVIES</h1>');
}

function initializeTvShowPageView() {
  $('#main').append('<h1>TV</h1>');
}

function initializeGamePageView() {
  $('#main').append('<h1>GAMES</h1>');
}

function initializeHomePageView() {
  $('#main').append('<h1>HOME</h1>');
  initializePageComponents();
}

function initializePageComponents() {
  addItemDropdown = new AddItemDropdown({ target: '.nav-wrapper' });

  $(".main-nav-button").sideNav();
}
