json.extract! album, :id, :title, :description

if show_photos
  json.photos do
    json.array! album.photos do |photo|
      json.partial! 'photos/photo', photo: photo
    end
  end
end
