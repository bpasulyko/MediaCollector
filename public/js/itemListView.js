function ItemListView(params) {
  var target = params.target;
  var type = params.type;
  var genre = params.genre ? params.genre : true;
  var year = params.year ? params.year : true;
  var platform = params.platform ? params.platform : true;
  var inProgress = params.inProgress ? params.inProgress : true;
  var watched = params.watched ? params.watched : true;
  var completed = params.completed ? params.completed : true;
  var played = params.played ? params.played : true;

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
