Sparklr.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  parse: function (payload) {
    if (payload.albums) {
      this.albums().set(payload.albums, {parse: true});

      delete payload.photos;
    }

    if (payload.photostream){
      this.photostream().set(payload.photostream)

      delete payload.photostream
    }

    return payload;
  },

  albums: function () {
    this._albums = this._albums ||
      new Sparklr.Collections.Albums([]);

    return this._albums;
  },

  photos: function () {
    if (!this._photos){
      var self = this;
      this._photos = new Sparklr.Collections.Photos([]);
      this.albums().each(function(album) {
        album.photos().each(function(photo) {
          self._photos.add(photo);
        });
      });
    }
    return this._photos
  },

  photostream: function (options) {
    if (options && options.url) {
      this._photostream = new Sparklr.Models.Photostream({url: options.url})
    } else {
      this._photostream = this._photostream ||
        new Sparklr.Models.Photostream()
    }

    return this._photostream;
  },

  toJSON: function (){
    return { user: _.clone( this.attributes ) };
  },
})

Sparklr.Models.CurrentUser = Sparklr.Models.User.extend({
  url: "/api/session",

  initialize: function (options) {
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew()
  },

  signIn: function (options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);

        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    })
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: 'json',
      success: function(data){
        model.clear();
        Sparklr.albums = new Sparklr.Collections.Albums();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
    } else {
      this.trigger("signOut");
    }
  }
})
