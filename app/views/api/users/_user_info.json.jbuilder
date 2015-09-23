json.extract! user, :id, :email, :fname, :albums
json.profile_pic_url user.profile_pic_url
json.created_at user.created_at.to_date
