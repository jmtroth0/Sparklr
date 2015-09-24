Sparklr.Views.PhotoForm = Backbone.View.extend({
  template: JST['photo/form'],

  initialize: function (options) {
    this.photo = new Sparklr.Models.Photo();
    if (options && options.photos) {
      this.photos = options && options.photos;
      this.album_id = options && options.album_id;
      this.redirectURLRoot = "/albums/" + this.album_id + "/photos/"
    } else {
      this.photos = Sparklr.currentUser.photos();
      this.redirectURLRoot = "/photostream/" + Sparklr.currentUser.id + "/photos/"
    }
    this.listenTo(this.photo, "sync", this.render);
  },

  events: {
    'submit form': 'submit',
    'change #input-photo-image': "fileInputChange",
  },

  render: function () {
    this.$el.html(this.template({ photo: this.photo, album_id: this.album_id }))

    return this;
  },

  submit: function (e) {
    e.preventDefault();

    var attrs = $(e.target).serializeJSON();
    var file = this.$('#input-photo-image')[0].files[0];

    var formData = new FormData();
    for(var attr in attrs) {
      formData.append("photo[" + attr + "]", attrs[attr])
    }
    formData.append("photo[image]", file)
    var self = this;
    this.photo.saveFormData(formData, {
      success: function () {
        self.photos.add(self.photo);
        Backbone.history.navigate(
          self.redirectURLRoot + self.photo.id,
          { trigger: true }
        )
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

  fileInputChange: function(e) {
    var self = this;
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      self._updatePreview(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  _updatePreview: function (src) {
    this.$el.find("#preview-post-image").attr("src", src);
  }
})
