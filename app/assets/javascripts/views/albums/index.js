Sparklr.Views.AlbumIndex = Backbone.View.extend({
  template: JST['album/index'],

  initialize: function (options) {
    this.albums = options.albums;
    this.listenTo(this.albums, 'sync', this.render)
  },
})
