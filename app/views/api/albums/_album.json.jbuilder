json.extract! album, :id, :title, :description

json.user do
  json.partial! 'users/user', user: album.user
end

if show_photos
  json.photos do
    json.array! album.photos do |photo|
      json.partial! 'api/photos/photo', photo: photo
    end
  end
else
  json.cover_photo_url asset_path(album.cover_photo_url)
end
