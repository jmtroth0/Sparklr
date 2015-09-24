json.extract! user, :id, :email, :fname
json.created_at user.created_at.to_date
json.photostream do
  json.extract! user.photostream, :id, :title, :description
end
# json.profilePhoto
json.coverPhoto asset_path(user.cover_photo_url)
json.profile_pic_url asset_path(user.profile_pic_url)
