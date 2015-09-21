json.extract! user, :id, :email, :fname, :albums
json.created_at user.created_at.to_date
json.photostream do
  json.extract! user.photostream, :id, :title, :description
end
# json.profilePhoto
json.coverPhoto asset_path(user.profile_cover_image_url)
