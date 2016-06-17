function Item(params) {
  function render(data) {
    var poster = window.config.images.base_url + window.config.images.poster_sizes[1] + data.poster;
    $(params.target).append(`
      <div class="col s3 l2">
        <img src="${poster}" />
      </div>
    `);
  }

  return {
    render: render,
  }
}
