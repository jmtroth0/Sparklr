Sparklr.Views.ResultItem = Backbone.View.extend({
  template: JST['search/result_item'],
  tagName: 'li',
  className: 'result-item group',

  initialize: function (options) {
    this.result = options.result;
  },

  render: function () {
    this.$el.html(this.template({ result: this.result }));
    return this;
  },
})
