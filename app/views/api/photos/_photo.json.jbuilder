
json.image_url asset_path(photo.image.url(:original))

json.extract! photo, :id, :title, :description

json.uploader do
  json.partial! 'users/user', user: photo.uploader
end
