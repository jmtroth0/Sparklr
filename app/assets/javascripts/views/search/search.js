Sparklr.Views.Search = Backbone.CompositeView.extend({
  template: JST['search/main'],
  className: 'main-search',

  initialize: function (options) {
    this.bindScroll();
    if (options && options.searchQuery) {
      this.searchResults = new Sparklr.Collections[options.type]();
      this.listenTo(this.searchResults, "sync", this.render);
      this.search(options.searchQuery);
    };
  },

  events: {
    "click button.photo-album-search": "searchPhotoAlbumFromView",
    "click button.user-search": "searchUsersFromView"
  },

  render: function () {
    this.$el.html(this.template());

    this.searchResults.each(function (result) {
      this.addResult(result);
    }.bind(this))

    return this;
  },

  searchPhotoAlbumFromView: function (e) {
    e.preventDefault();
    this.searchResults = new Sparklr.Collections.SearchResults();
    window.history.pushState({}, "", "#/search/" + this.$(".query").val())
    this.search(this.$(".query").val());
  },

  searchUsersFromView: function (e) {
    e.preventDefault();
    this.searchResults = new Sparklr.Collections.UserSearchResults();
    window.history.pushState({}, "", "#/search/users/" + this.$(".query").val())
    this.search(this.$(".query").val());
  },

  search: function (query) {
    this.listenTo(this.searchResults, "sync", this.render);
    this.searchResults.pageNum = 1;
    this.searchResults.query = query;

    this.searchResults.fetch({
      data: {
        query: this.searchResults.query,
        page: 1,
      }
    });
  },

  addResult: function (result) {
    var resultView = new Sparklr.Views.ResultItem ({
      result: result
    });
    this.addSubview('ul.results', resultView);
  },

  bindScroll: function () {
    $(window).on("scroll", this.handleScroll.bind(this));
  },

  remove: function () {
    $(window).off();
    Backbone.CompositeView.prototype.remove.call(this);
  },

  handleScroll: function (e) {
    var $doc = $(document);
    var scrolledDist = $doc.height() - window.innerHeight - $doc.scrollTop();

    if (scrolledDist < 300) {
      this.nextPageInfiniteScroll();
    }
  },

  nextPageInfiniteScroll: function () {
    if (this.requestingNextPage) return;

    this.requestingNextPage = true;
    this.searchResults.fetch({
      remove: false,
      data: {
        query: this.searchResults.query,
        page: this.searchResults.pageNum + 1
      },
      success: function () {
        this.requestingNextPage = false;
        this.searchResults.pageNum++;
      }.bind(this)
    })
  }
})
