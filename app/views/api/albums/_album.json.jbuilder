json.extract! album, :id, :title, :description

if show_user
  json.user do
    json.partial! 'api/users/user_info', user: album.user
  end
end

if show_photos
  json.photos do
    json.array! album.photos do |photo|
      json.partial! 'api/photos/photo',
        photo: photo,
        style: :thumb,
        show_albums: false
    end
  end

  json.cover_photo_url asset_path(album.cover_photo_url)

else
  json.cover_thumbnail_url asset_path(album.thumb_photo_url)
end
