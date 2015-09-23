json.extract! user, :id, :email, :fname, :albums
json.created_at user.created_at.to_date
