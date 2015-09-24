json.array! @photos,
  partial: 'api/photos/photo',
  as: :photo,
  locals: { style: :thumb, show_albums: false }
