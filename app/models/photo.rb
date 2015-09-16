class Photo < ActiveRecord::Base
  validates :title, :uploader_id, presence: true

  belongs_to :uploader, class_name: 'User'
  has_many :album_photos
  has_many :albums, through: :album_photos, source: :album

  DEFAULT_IMAGE_URL = 'profile_default.png'
  has_attached_file :image, default_url: DEFAULT_IMAGE_URL
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
