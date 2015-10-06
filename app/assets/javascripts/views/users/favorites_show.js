Sparklr.Views.ShowFavorites = Sparklr.Views.AlbumShow.extend({
  className: 'album-show-container',

  render: function () {
    var coverView = new Sparklr.Views.UserCover({user: this.user})
    this.$el.html(this.template({ album: this.model, favorite: 'favorite' }));
    coverView.addUserCover($('#main'));
    this.model.photos().each(function (photo) {
      this.addPhoto(photo, { favorite: 'favorite' })
    }.bind(this))
    return this;
  },
});
