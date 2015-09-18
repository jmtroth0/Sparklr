class Photo < ActiveRecord::Base
  validates :title, :uploader_id, presence: true

  belongs_to :uploader, class_name: 'User'
  has_many :album_photos
  has_many :albums, through: :album_photos, source: :album

  DEFAULT_PROFILE_IMAGE_URL = 'profile_default.png'
  DEFAULT_COVER_IMAGE_URL = 'blue-mosque-cover.jpg'
  DEFAULT_THUMB_IMAGE_URL = 'blue-mosque-thumb.jpg'
  has_attached_file :image,
    default_url: DEFAULT_COVER_IMAGE_URL,
    styles: { thumb: "200x200#", cover: "800x300#" },
    convert_options: { thumb: "-thumbnail 200" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
