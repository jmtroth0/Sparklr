window.Sparklr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new Sparklr.Models.CurrentUser();
    this.currentUser.fetch()
    this.router = new Sparklr.Routers.Router({ $rootEl: $('div#main') });

    Backbone.history.start();
  },
};
