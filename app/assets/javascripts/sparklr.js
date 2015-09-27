window.Sparklr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(signInBackdropUrl) {
    this.signInBackdropUrl = signInBackdropUrl
    this.currentUser = new Sparklr.Models.CurrentUser();
    this.currentUser.fetch();
    this.router = new Sparklr.Routers.Router({ $rootEl: $('div#main') });

    Backbone.history.start();
  },
};
