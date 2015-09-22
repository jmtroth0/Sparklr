json.image_url asset_path(photo.image.url(style))

json.extract! photo, :id, :title, :description, :dimensions

json.uploader do
  json.partial! 'users/user', user: photo.uploader
end
