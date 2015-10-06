Sparklr.Collections.Photos = Backbone.Collection.extend({
  url: 'api/photos',
  model: Sparklr.Models.Photo,
});

Sparklr.Collections.RecentPhotos = Sparklr.Collections.Photos.extend({
  url: 'api/photos/recent'
});
