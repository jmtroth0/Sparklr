window.Sparklr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new Sparklr.Models.CurrentUser();
    this.currentUser.fetch({
      success: function () {
        var router = new Sparklr.Routers.Router({ $rootEl: $('div#main') });

        Backbone.history.start();
      }
    });

  },
};
