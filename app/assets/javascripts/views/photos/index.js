Sparklr.Views.PhotoIndex = Backbone.CompositeView.extend({
  template: JST['photo/index'],
  className: 'index',

  initialize: function (options) {
    this.bindScroll();
    this.photos = options.photos;
    this.photos.pageNum = 1;
    this.photos.fetch({data: {page: this.photos.pageNum} } );
    this.listenTo(this.photos, 'sync', this.placePhotos);
  },

  render: function () {
    this.$el.html(this.template());
    this.placePhotos();
    return this;
  },

  placePhotos: function () {
    if (this.photos && this.photos.length > 0) {
      this.photos.each(function (photo) {
        this.addPhoto(photo);
      }.bind(this))
    }
    this.$el.find('.photo-list').removeClass('group');
    this.$el.find('.photoIndexItem').removeClass('group');
    this.$el.find('.photoIndexItem').css('float', 'none');
    this.$el.find('img.photo-thumbnail').css('max-width', '100%');
    this.$el.find('.photo-link').removeClass('group');
  },

  addPhoto: function (photo) {
    var photoView = new Sparklr.Views.PhotoIndexItem ({
      photo: photo,
      photos: this.photos,
    });

    this.addSubview('ul.photo-list', photoView);
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
    this.photos.fetch({
      remove: true,
      data: {
        page: this.photos.pageNum + 1
      },
      success: function () {
        this.requestingNextPage = false;
        this.photos.pageNum++;
      }.bind(this)
    })
  }
})
