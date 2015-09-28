json.array! @albums,
  partial: 'api/albums/album',
  as: :album,
  locals: {
    show_photos: false,
    show_user: false
  }
