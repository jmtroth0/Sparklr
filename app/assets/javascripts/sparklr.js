window.Sparklr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(signInBackdropUrl) {
    this.signInBackdropUrl = signInBackdropUrl
    this.router = new Sparklr.Routers.Router({ $rootEl: $('div#main') });

    Backbone.history.start();
  },
};
