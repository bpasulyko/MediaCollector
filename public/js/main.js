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
  $('#main').append('<h1>MOVIES</h1>');
}

function initializeTvShowPageView() {
  $pageTitle.html('<i class="material-icons left">airplay</i>TV Shows');
  $('#main').append('<h1>TV</h1>');
}

function initializeGamePageView() {
  $pageTitle.html('<i class="material-icons left">games</i>Games');
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
