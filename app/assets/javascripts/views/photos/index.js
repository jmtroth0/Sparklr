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
  },

  addPhoto: function (photo) {
    var photoView = new Sparklr.Views.PhotoIndexItem ({
      photo: photo,
      photos: this.photos,
    });
    this.addSubview('ul.photo-list', photoView);
    this.setPhotoViewStyle(photo, photoView);
  },

  setPhotoViewStyle: function (photo, photoView) {
    var width = photo.dimensions[0] < $(window).width() * .8 ? photo.dimensions[0] : $(window).width() * .8
    photoView.$el.css('width', width);
    photoView.$el.css('margin', '5px auto');
    photoView.$el.find('.photoIndexItem').css('float', 'none');
    photoView.$el.find('img.photo-thumbnail').css('width', width);
    photoView.$el.find('.photo-link').removeClass('group');
    photoView.$el.find('.photoIndexItem').css('width', width);
    photoView.$el.find('div.photo-info').append('<h4>By: ' + photo.get('uploader').email +'</h4>');
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
