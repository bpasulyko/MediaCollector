var addItemDropdown;
var $pageTitle;

$(document).ready(function() {
  $(".main-nav-button").sideNav();
  setupPageView();
});

function setupPageView() {
  $pageTitle = $('.brand-logo');
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
  $pageTitle.html('<i class="material-icons left">theaters</i>Movies');
  new ItemListView({
    target: '#item-grid',
    type: 'movie',
    platform: false,
    inProgress: false,
    completed: false
  });
}

function initializeTvShowPageView() {
  $pageTitle.html('<i class="material-icons left">airplay</i>TV Shows');
  new ItemListView({
    target: '#item-grid',
    type: 'series',
    platform: false,
    watched: false,
  });
}

function initializeGamePageView() {
  $pageTitle.html('<i class="material-icons left">games</i>Games');
  new ItemListView({
    target: '#item-grid',
    type: 'game',
    watched: false,
  });
}

function initializeHomePageView() {
  $pageTitle.html('Media Collector');
  $('#main').append('<h1>HOME</h1>');
  initializePageComponents();
}

function initializePageComponents() {
  addItemDropdown = new AddItemDropdown({ target: '.nav-wrapper' });
}
