class Photostream < ActiveRecord::Base
  validates :title, :user_id, presence: true

  belongs_to :user
  has_many :photos, through: :user, source: :photos

  def cover_photo_url(style = :cover)
    unless photos.empty?
      photos.first.image.url(style)
    else
      Photo::DEFAULT_COVER_IMAGE_URL
    end
  end
end
