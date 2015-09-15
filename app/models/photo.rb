class Photo < ActiveRecord::Base
  validates :title, :uploader_id, :privacy, presence: true

  belongs_to :uploader, classname: 'user'
  has_many :albums, through: :album_photos, source: :album
  has_many :album_photos
end
