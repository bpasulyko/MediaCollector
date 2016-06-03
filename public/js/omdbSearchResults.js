function OmdbSearchResults(params) {
  var target = params.target;

  return {
    setData: setData
  }

  function setData(data) {
    render(data);
  }

  function render(data) {
    $(target).empty();
    $(target).append(buildHtml(data));
    $('.collapsible').collapsible({
      accordion : false
    });
    bindEvents();
  }

  function buildHtml(data) {
    var htmlString = '<ul class="collapsible popout" data-collapsible="accordion">';

    data.forEach(function (result) {
      htmlString += `
        <li>
          <div class="collapsible-header"><span class="movie-title">${result.Title}</span> (${result.Year})</div>
          <div class="collapsible-body"></div>
        </li>
      `;
    });

    return htmlString += '</ul>';
  }

  function bindEvents() {
    $('.collapsible-header').on('click', function() {
      var $selectedHeader = $(this);
      var $selectedBody = $(this).siblings('.collapsible-body');
      var data = {
        title: $(this).find('.movie-title').text(),
      };
      if ($selectedBody.children().length === 0) {
        getMovieData(data, $selectedBody);
      }
    });
  }

  function getMovieData(data, $selectedBody) {
    $.ajax({
      url: '/getMovie',
      type: 'POST',
      data: data,
      datatype: 'json',
      success: function(result) {
        $selectedBody.append(buildMovieDetails(JSON.parse(result)));
      }
    });
  }

  function buildMovieDetails(movie) {
    return `
      <div class="row">
        <img src="${movie.Poster}" />
        <span>${movie.Plot}</span>
      </div>
    `;
  }
}
