class Album < ActiveRecord::Base
  belongs_to :user
  has_many :photos, through: :album_photos, source: :photo
  has_many :album_photos

  def cover_photo_url(style = :original)
    unless photos.empty?
      photos.first.image.url(style)
    else
      Photo::DEFAULT_IMAGE_URL
    end
  end
end
