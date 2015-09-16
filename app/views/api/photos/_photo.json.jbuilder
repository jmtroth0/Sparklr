json.extract! photo, :id, :title, :description, :created_at

json.image_url asset_path(photo.image.url(:original))

json.uploader do
  json.partial! 'users/user', user: photo.uploader
end
