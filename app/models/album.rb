class Album < ActiveRecord::Base
  belongs_to :user
  has_many :photos, through: :album_photos, source: :photo
  has_many :album_photos
end
