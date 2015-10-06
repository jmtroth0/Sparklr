json.array! @favorites do |favorite|
  json.partial! 'api/photos/photo', photo: favorite, show_albums: false
end
