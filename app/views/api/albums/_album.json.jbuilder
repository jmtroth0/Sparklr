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
elsif album.photos.first
  json.cover_photo do
    json.partial! 'api/photos/photo', photo: album.photos.first
  end
end
