
json.photos do
  json.array! @favorites do |favorite|
    json.partial! 'api/photos/photo', photo: favorite, show_albums: false, style: :thumb
  end
end
