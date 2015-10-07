Sparklr.Views.PhotoShowSub = Backbone.View.extend({
  template: JST['photo/showSub'],

  events: {
    'click button.add-to-album': 'openAlbumModal',
    'submit form.choose-albums': 'submitAlbums',
    'click button.close-album-form': 'closeModal',
    'click button.favorite-picture': 'addFavorite',
    'click button.un-favorite-picture': 'removeFavorite',
  },

  initialize: function (options) {
    this.photo = options.photo;
    this.listenTo(Sparklr.currentFavoritePhotos, 'sync', this.bindEvents);
  },

  bindEvents: function (e) {
    this.checkFaveButton(e);
    this.listenTo(Sparklr.currentFavoritePhotos.photos(), 'add remove', this.checkFaveButton)
    this.listenTo(Sparklr.currentFavoritePhotos, 'sync', this.checkFaveButton)
  },

  render: function () {
    this.$el.html(this.template({photo: this.photo}));
    return this;
  },

  openAlbumModal: function () {
    this.$el.find('.form-modal').addClass('is-active');
    Sparklr.currentUser.albums().fetch();
    this.photo.albums().fetch();
    this.listenTo(Sparklr.currentUser.albums(), 'sync', this.addChoicesToModal);
    this.listenTo(this.photo.albums(), 'sync', this.addChoicesToModal);
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
      $choice.append(album.escape('title')).append('<br>');
      $choices.append($choice);
    }.bind(this));
    $choices.append($('<input type="submit" value="Save Albums">'))
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

  addFavorite: function (e) {
    e.preventDefault();
    var self = this
    var photo = this.photo
    var attrs = {'favorite': { favoriteable_id: this.photo.id, favoriteable_type: 'Photo' }}

    $.ajax({
      url: "api/favorites",
      type: 'POST',
      data: attrs,
      dataType: 'json',
      success: function(){
        Sparklr.currentFavoritePhotos.photos().add(photo);
        self.checkFaveButton();
      },
    });
  },

  removeFavorite: function (e) {
    e.preventDefault();
    var self = this;
    var photo_id = this.photo.id
    var attrs = {'favorite': { favoriteable_id: photo_id, favoriteable_type: 'Photo' }}

    $.ajax({
      url: "api/favorites/" + photo_id,
      type: 'DELETE',
      data: attrs,
      dataType: 'json',
      success: function(){
        Sparklr.currentFavoritePhotos.photos().remove(photo_id);
        self.checkFaveButton();
      },
    });
  },

  checkFaveButton: function (e) {
    var $container = this.$el.find('div.user-photo-buttons')
    if (Sparklr.currentFavoritePhotos && Sparklr.currentFavoritePhotos.photos().get(this.photo.id)) {
      var $button = $container.find('button.favorite-picture');
      if ($button.length !== 0){
        $button.remove();
        $container.append('<button class="un-favorite-picture">Unfave?</button>')
      }
    } else {
      var $button = $container.find('button.un-favorite-picture')
      if ($button.length !== 0){
        $button.remove();
        $container.append('<button class="favorite-picture">Fave?</button>')
      }
    }
  },
});
