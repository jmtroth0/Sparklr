Sparklr.Views.UserCover = Backbone.View.extend({
  template: JST['user/user_cover'],
  className: 'user-cover-container',

  events: {
  },

  initialize: function (options) {
    this.user = options.user;
    this.listenTo(this.user, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({user: this.user}));
    return this;
  },

  addUserCover: function ($el) {
    // top of main page when logged in and not 'exploring' or using a 'show' action
    if ($el.find('.user-cover-container').length > 0){
      $el.find('.user-cover-container').remove();
    }
    $el.prepend(this.render().$el);
    if (this.user.get('coverPhoto')) {
      $el.find('.user-cover-main').css('background-image', 'url(' + this.user.get('coverPhoto'));
    }
    this.$el.find('a.photostream-link').attr('href', "#/users/" + this.user.get('id') + "/photostream")
    this.$el.find('a.albums-link').attr('href', "#/users/" + this.user.get('id') + "/albums")
  },

  removeCover: function() {
    this.$el.remove();
  },
})
