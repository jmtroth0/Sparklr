class Photo < ActiveRecord::Base
  include PgSearch

  validates :title, :uploader_id, presence: true

  belongs_to :uploader, class_name: 'User'
  has_many :album_photos, dependent: :destroy
  has_many :albums, through: :album_photos, source: :album

  multisearchable against: [:title]

  DEFAULT_PROFILE_IMAGE_URL = 'profile_default.png'
  DEFAULT_COVER_IMAGE_URL = 'blue-mosque-cover.jpg'
  DEFAULT_THUMB_IMAGE_URL = 'blue-mosque-thumb.jpg'
  DEFAULT_PROFILE_COVER_IMAGE_URL = 'cover_default.png'
  has_attached_file :image,
    default_url: DEFAULT_COVER_IMAGE_URL,
    styles: { thumb: "200x133#", cover: "800x300#" },
    convert_options: { thumb: "-thumbnail 200" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  before_save :extract_dimensions

  def extract_dimensions
    tempfile = image.queued_for_write[:original]
    unless tempfile.nil?
      geometry = Paperclip::Geometry.from_file(tempfile)
      self.dimensions = "" + geometry.width.to_i.to_s + "," + geometry.height.to_i.to_s
    end
  end
end
