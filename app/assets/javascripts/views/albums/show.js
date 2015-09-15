Sparklr.Views.AlbumShow = Backbone.View.extend({
  template: JST['album/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    this.$el.html(this.template({ album: this.model }))
  }
})
