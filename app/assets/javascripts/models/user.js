Sparklr.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  parse: function (payload) {
    if (payload.albums) {
      this.albums().set(payload.albums, {parse: true});

      delete payload.photos;
    }
    if (payload.photostream){
      this.photostream().set(payload.photostream)
    }

    return payload;
  },

  albums: function () {
    this._albums = this._albums ||
      new Sparklr.Collections.Albums([], { photo: this } );

    return this._albums;
  },

  photostream: function () {
    this._photostream = this._photostream ||
      new Sparklr.Models.Album()

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
    return !this.isNew
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
