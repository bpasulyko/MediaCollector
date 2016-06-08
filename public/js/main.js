var addItemDropdown;
var $pageTitle;

$(document).ready(function() {
  setupPageView();
  initializePageComponents();
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
    target: '#main',
    type: 'movie',
    genre: true,
    year: true,
    platform: false,
    inProgress: false,
    watched: true,
    completed: false
  });
  $('#main').append('<h1>MOVIES</h1>');
}

function initializeTvShowPageView() {
  $pageTitle.html('<i class="material-icons left">airplay</i>TV Shows');
  new ItemListView({
    target: '#main',
    type: 'series',
    genre: true,
    year: true,
    platform: false,
    inProgress: true,
    watched: false,
    completed: true
  });
  $('#main').append('<h1>TV</h1>');
}

function initializeGamePageView() {
  $pageTitle.html('<i class="material-icons left">games</i>Games');
  new ItemListView({
    target: '#main',
    type: 'game',
    genre: true,
    year: true,
    platform: true,
    inProgress: true,
    watched: false,
    completed: true
  });
  $('#main').append('<h1>GAMES</h1>');
}

function initializeHomePageView() {
  $pageTitle.html('Media Collector');
  $('#main').append('<h1>HOME</h1>');
  initializePageComponents();
}

function initializePageComponents() {
  addItemDropdown = new AddItemDropdown({ target: '.nav-wrapper' });

  $(".main-nav-button").sideNav();
}
