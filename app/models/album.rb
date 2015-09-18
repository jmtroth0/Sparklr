class Album < ActiveRecord::Base
  belongs_to :user
  has_many :photos, through: :album_photos, source: :photo
  has_many :album_photos

  def cover_photo_url(style = :cover)
    unless photos.empty?
      photos.first.image.url(style)
    else
      Photo::DEFAULT_COVER_IMAGE_URL
    end
  end

  def thumb_photo_url(style = :thumb)
    unless photos.empty?
      photo.first.image.url(style)
    else
      Photo::DEFAULT_THUMB_IMAGE_URL
    end
  end
end
