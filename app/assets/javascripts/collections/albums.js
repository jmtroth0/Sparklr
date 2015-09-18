Sparklr.Collections.Albums = Backbone.Collection.extend({
  url: 'api/albums',
  model: Sparklr.Models.Album,
  //
  // getOrFetch: function (id) {
  //   var album = this.get(id)
  //   var albums = this;
  //
  //   if (album){
  //     album.fetch()
  //   } else {
  //     album = new this.model ({id: id})
  //     albums.add(album)
  //     album.fetch({
  //       error: albums.remove
  //     })
  //   }
  //   return album;
  // },
})
