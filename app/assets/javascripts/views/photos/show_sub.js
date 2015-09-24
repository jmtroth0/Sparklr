Sparklr.Views.PhotoShowSub = Backbone.View.extend({
  template: JST['photo/showSub'],

  events: {
    'click button.add-to-album': 'openAlbumModal',
    'submit form.choose-albums': 'submitAlbums',
    'click button.close-album-form': 'closeModal',
  },

  initialize: function (options) {
    this.photo = options.photo;
  },

  render: function () {
    this.$el.html(this.template({photo: this.photo}));
    return this;
  },

  openAlbumModal: function () {
    this.$el.find('.form-modal').addClass('is-active');
    this.listenTo(Sparklr.currentUser.albums(), 'sync', this.addChoicesToModal)
    this.addChoicesToModal();
  },

  closeModal: function () {
    this.$el.find('.form-modal').removeClass('is-active');
  },

  addChoicesToModal: function () {
    var $choices = this.$el.find('div.choices')
    $choices.html('Your Albums: <br>')
    var $emptyChoice = $('<input type="hidden" name="cat[tag_ids][]" value="">');
    $choices.append($emptyChoice);
    Sparklr.currentUser.albums().each(function(album) {
      var $choice = $('<label class="album-choice">');
      if (this.photo.albums().some(function(my_album) {
        return album.id === my_album.id
      })) {
        $choice.html('<input type="checkbox" name="album_ids[]" value="' + album.id + '" checked>')
      } else {
        $choice.html('<input type="checkbox" name="album_ids[]" value="' + album.id + '">')
      }
      $choice.append(album.escape('title'))
        .append('<br>');
      $choices.append($choice);
    }.bind(this));
    $choices.append($('<input type="submit" value="Edit Albums">'))
    this.$el.find('.form-modal form.choose-albums').html($choices);
  },

  submitAlbums: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();
    attrs.album_ids = attrs.album_ids && attrs.album_ids.concat([""]) || [""];
    var self = this;
    this.photo.save(attrs, {
      success: function () {
        self.closeModal();
        self.render();
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
});
