window.apiKey = 'c61fe26ad89f613231e56e67cff3779d';
window.mainUrl = 'http://api.themoviedb.org/3/';

var addItemDropdown;
var $pageTitle;

$(document).ready(function() {
  getConfigData();
  $(".main-nav-button").sideNav();
  setupPageView();
});

function getConfigData() {
  $.ajax({
    url: 'http://api.themoviedb.org/3/configuration?api_key=' + window.apiKey,
    type: 'GET',
    datatype: 'json',
    success: function(result) {
      window.config = result;
    }
  });
}

function setupPageView() {
  $pageTitle = $('.brand-logo');
  var page = window.location.href.split('/').pop();
  if (page === 'movies') {
    initializeMoviePageView();
  } else if (page === 'tvshows') {
    initializeTvShowPageView();
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

function initializeHomePageView() {
  $pageTitle.html('Media Collector');
  $('#main').append('<h1>HOME</h1>');
  initializePageComponents();
}

function initializePageComponents() {
  addItemDropdown = new AddItemDropdown({ target: '.nav-wrapper' });
}
