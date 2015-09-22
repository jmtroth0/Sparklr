Sparklr.Models.Photo = Backbone.Model.extend({
  urlRoot: 'api/photos',

  parse: function (payload) {
    if (payload.albums) {
      this.albums().set(payload.albums, {parse: true});
      delete payload.albums;
    };

    if (payload.dimensions) {
      this.dimensions = payload.dimensions.split(",");
      this.dimensions[0] = parseInt(this.dimensions[0])
      this.dimensions[1] = parseInt(this.dimensions[1])
      delete payload.dimensions;
    } else {
      this.dimensions = [400, 300];
    };

    return payload;
  },

  albums: function () {
    this._albums = this._albums ||
      new Sparklr.Collections.Albums([], { photo: this } );

    return this._albums;
  },

  toJSON: function (){
    return { photo: _.clone( this.attributes ) };
  },

  saveFormData: function(formData, options) {
    var method = this.isNew() ? "POST" : "PATCH";
    var model = this;

    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options.error && options.error(model, resp, options)
      }
    });
  },
})
