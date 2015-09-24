Sparklr.Collections.Albums = Backbone.Collection.extend({
  url: 'api/albums',
  model: Sparklr.Models.Album,

  initialize: function (options) {
    if (options && options.url) {
      this.url = options.url
    }
  }
})
