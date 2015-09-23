Sparklr.Views.Search = Backbone.View.extend({
  initialize: function (options) {
    this.bindScroll();
    this.searchResults = new Sparklr.Collections.SearchResults();
    this.searchResults.pageNum = 1;
    this.listenTo(this.searchResults, "sync", this.render);
    if (options && options.searchQuery) {
      this.search(options.searchQuery);
    }
  },

  events: {
    "change .query": "search",
  },

  template: JST['shared/search'],

  render: function () {
    var content = this.template({
      results: this.searchResults,
    });
    this.$el.html(content);

    return this;
  },

  searchFromView: function (e) {
    e.preventDefault();
    this.search(this.$(".query").val());
  },

  search: function (query) {
    this.searchResults.pageNum = 1;
    this.searchResults.query = query;

    this.searchResults.fetch({
      data: {
        query: this.searchResults.query,
        page: 1,
      }
    });
  },

  bindScroll: function () {
    $(window).on("scroll", this.handleScroll.bind(this));
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
