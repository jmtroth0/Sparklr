Sparklr.Collections.SearchResults = Backbone.Collection.extend({
  url: "/api/search",

  parse: function (resp) {
    if (resp.total_count) {
      this.total_count = resp.total_count;
    }

    return resp.results;
  },

  model: function (attrs) {
    var type = attrs._type;
    delete attrs._type;

    return new Sparklr.Models[type](attrs);
  },
})

Sparklr.Collections.UserSearchResults = Sparklr.Collections.SearchResults.extend({
  url: "/api/user_search",

  model: function (attrs) {
    return new Sparklr.Models.User(attrs);
  }
})
