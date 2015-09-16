class Photo < ActiveRecord::Base
  validates :title, :uploader_id, presence: true

  belongs_to :uploader, class_name: 'User'
  has_many :album_photos
  has_many :albums, through: :album_photos, source: :album

  has_attached_file :image, default_url: 'profile_default.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
