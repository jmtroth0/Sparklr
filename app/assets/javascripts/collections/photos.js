Sparklr.Collections.Photos = Backbone.Collection.extend({
  url: 'api/photos',
  model: Sparklr.Models.Photo,

  getOrFetch: function (id) {
    var photo = this.get(id)
    var photos = this;

    if (photo){
      photo.fetch()
    } else {
      photo = new this.model ({id: id})
      photos.add(photo)
      photo.fetch({
        error: photos.remove
      })
    }
    return photo;
  },
})
