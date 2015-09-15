window.Sparklr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Sparklr.Routers.Router({ $rootEl: $('div#main') });
    Backbone.history.start();
  },
};

$(document).ready(function(){
  Sparklr.initialize();
});
