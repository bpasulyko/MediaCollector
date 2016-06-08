function ItemListView(params) {
  var target = params.target;
  var type = params.type;
  var genre = params.genre ? params.genre : true;
  var year = params.year ? params.year : true;
  var platform = params.platform ? params.platform : true;
  var inProgress = params.inProgress ? params.inProgress : true;
  var watched = params.watched ? params.watched : true;
  var completed = params.completed ? params.completed : true;

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
      }
    });
  }
}
