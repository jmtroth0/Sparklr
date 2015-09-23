Backbone.Collection.prototype.getOrFetch = function (id) {
  var model = this.get(id);
  var collection = this;

  if (model){
    model.fetch();
  } else {
    model = new this.model ({id: id})
    collection.add(model)
    model.fetch({
      error: collection.remove
    })
  }
  return model;
};

Backbone.View.prototype.addUserCover = function () {
  var coverView = new Sparklr.Views.UserCover({user: this.user})
  coverView.addUserCover($('#main'));
};
