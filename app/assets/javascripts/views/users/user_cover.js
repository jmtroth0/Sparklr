Sparklr.Views.UserCover = Backbone.View.extend({
  template: JST['user/user_cover'],
  tagName: 'div',
  className: 'user-cover-container',

  events: {
  },

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },
})
