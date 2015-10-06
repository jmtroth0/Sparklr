Sparklr.Views.ShowFavorites = Sparklr.Views.AlbumShow.extend({
  className: 'album-show-container',

  render: function () {
    var coverView = new Sparklr.Views.UserCover({user: this.user})
    this.$el.html(this.template({ album: this.model, photostream: true }));
    coverView.addUserCover($('#main'));
    this.model.photos().each(function (photo) {
      this.addPhoto(photo, true)
    }.bind(this))
    return this;
  },
});
