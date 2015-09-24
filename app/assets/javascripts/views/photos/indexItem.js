Sparklr.Views.PhotoIndexItem = Backbone.View.extend({
  template: JST['photo/indexItem'],
  tagName: 'li',
  className: 'photoIndexItem group',
  
  initialize: function (options) {
    this.photo = options.photo;
    this.photoUrl = "#"
    if (typeof options.album_id === "number") {
      this.photoUrl += "/albums/" + options.album_id
    } else {
      this.photoUrl += "/photostream/" + Sparklr.currentUser.id
    }
    this.photoUrl += "/photos/" + this.photo.id
  },

  render: function () {
    this.$el.html(this.template({ photo: this.photo, photoUrl: this.photoUrl }));
    return this;
  },
})
