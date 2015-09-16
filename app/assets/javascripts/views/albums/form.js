Sparklr.Views.AlbumForm = Backbone.View.extend({
  template: JST['album/form'],

  initialize: function (options) {
    this.album = options.album;
    this.albums = options.albums;
    this.listenTo(this.album, "sync", this.render)
  },

  events: {
    'submit form': 'submit'
  },

  render: function () {
    this.$el.html(this.template({ album: this.album }))
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();
    var self = this;
    this.album.save(attrs, {
      success: function () {
        self.albums.add(self.album);
        Backbone.history.navigate('albums/' + self.album.id, { trigger: true })
      },

      error: function (model, response) {
        $('.form-errors').empty();
        response.responseJSON.forEach(function (el) {
          var $li = $('<li>');
          $li.text(el);
          $('.form-errors').append($li);
        });
      },
    });
  },
})
