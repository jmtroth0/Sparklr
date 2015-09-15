class AlbumPhoto < ActiveRecord::Base
  validates :photo_id, :album_id, presence: true

  belongs_to :photo
  belongs_to :album
end
