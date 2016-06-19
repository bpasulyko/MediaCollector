function ItemListView(params) {
  var target = params.target;
  var type = params.type;

  loadData();

  function loadData() {
    var data = {
      collection: type
    }
    $.ajax({
      url: '/loadItems',
      type: 'POST',
      data: data,
      datatype: 'json',
      success: function(result) {
        var item = new Item({ target: target });
        var resultList = _.sortBy(JSON.parse(result), 'title');
        resultList.forEach(function(obj) {
          item.render(obj);
        });
      }
    });
  }
}
