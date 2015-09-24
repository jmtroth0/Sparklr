json.image_url asset_path(photo.image.url(style))

json.extract! photo, :id, :title, :description, :dimensions

json.uploader do
  json.partial! 'users/user', user: photo.uploader
end

json.albums do
  json.array! photo.albums do |album|
    json.partial! 'api/albums/album', album: album, show_photos: false
  end
end
