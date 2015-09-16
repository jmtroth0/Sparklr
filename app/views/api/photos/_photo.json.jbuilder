json.extract! photo, :id, :title, :description, :privacy, :created_at
json.uploader do
  json.partial! 'users/user', user: photo.uploader
end
