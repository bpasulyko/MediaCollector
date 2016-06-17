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
        var resultList = JSON.parse(result).sort(function (a,b) {
          return a.title.toLowerCase() > b.title.toLowerCase();
        });
        resultList.forEach(function(obj) {
          item.render(obj);
        });
      }
    });
  }
}
