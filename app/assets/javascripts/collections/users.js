Sparklr.Collections.Users = Backbone.Collection.extend({
  url: 'api/users',
  model: Sparklr.Models.User,
  //
  // getOrFetch: function (id) {
  //   var photo = this.get(id)
  //   var photos = this;
  //
  //   if (photo){
  //     photo.fetch()
  //   } else {
  //     photo = new this.model ({id: id})
  //     photos.add(photo)
  //     photo.fetch({
  //       error: photos.remove
  //     })
  //   }
  //   return photo;
  // },
})
