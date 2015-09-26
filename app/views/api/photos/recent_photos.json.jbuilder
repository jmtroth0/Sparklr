json.array! @photos,
  partial: 'api/photos/photo',
  as: :photo,
  locals: { style: :original, show_albums: false }
