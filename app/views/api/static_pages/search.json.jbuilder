json.results do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "User"
      json.partial! "api/users/user_info", user: search_result.searchable
      json._type "User"
    elsif search_result.searchable_type == "Photo"
      json.partial! "api/photos/photo",
        photo: search_result.searchable,
        style: :thumb,
        show_albums: false
      json._type "Photo"
    elsif search_result.searchable_type == "Album"
      json.partial! "api/albums/album",
        album: search_result.searchable,
        show_photos: false,
        show_user: true;
      json._type "Album"
    end
  end
end
