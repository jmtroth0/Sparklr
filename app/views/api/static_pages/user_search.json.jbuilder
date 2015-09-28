json.results do
  json.array! @search_results do |search_result|
    json.partial! "api/users/user_info", user: search_result
  end
end
