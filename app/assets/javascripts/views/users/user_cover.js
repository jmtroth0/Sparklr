Sparklr.Views.UserCover = Backbone.View.extend({
  template: JST['user/user_cover'],
  tagName: 'div',
  className: 'user-cover-container',

  events: {
  },

  initialize: function (options) {
    this.user = options.user;
  },

  render: function () {
    this.$el.html(this.template({user: this.user}));
    return this;
  },

  addUserCover: function ($el) {
    // top of main page when logged in and not 'exploring' or using a 'show' action
    var coverView = new Sparklr.Views.UserCover({user: this.user});
    $el.prepend(coverView.render().$el);
  },

  removeCover: function() {
    this.$el.remove();
  },
})
