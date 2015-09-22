Sparklr.Views.Footer = Backbone.View.extend({
  template: JST['shared/footer'],
  className: 'footer-container',

  render: function () {
    this.$el.html(this.template());
    return this;
  },
});
