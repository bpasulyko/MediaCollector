function Item(params) {
  function render(data) {
    var poster = data.poster;
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
