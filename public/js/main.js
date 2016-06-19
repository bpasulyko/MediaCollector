window.apiKey = 'c61fe26ad89f613231e56e67cff3779d';
window.mainUrl = 'http://api.themoviedb.org/3/';

var addItemDropdown;
var $pageTitle;

$(document).ready(function() {
  $(".main-nav-button").sideNav();
  getConfigData()
    .then(setupPageView)
    .catch(function () {
      console.log('ERROR');
    });
});

function getConfigData() {
  return Promise.resolve(
    $.ajax({
      url: window.mainUrl + 'configuration?api_key=' + window.apiKey,
      type: 'GET',
      datatype: 'json',
      success: function(result) {
        window.config = result;
        return Promise.resolve();
      }
    })
  );
}

function setupPageView() {
  $pageTitle = $('.brand-logo');
  var page = window.location.href.split('/').pop();
  if (page === 'movie') {
    initializeMoviePageView();
  } else if (page === 'tv') {
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
  });
}

function initializeTvShowPageView() {
  $pageTitle.html('<i class="material-icons left">airplay</i>TV Shows');
  new ItemListView({
    target: '#item-grid',
    type: 'tv',
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
