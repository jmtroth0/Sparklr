class User < ActiveRecord::Base
  include PgSearch

  has_many :albums, dependent: :destroy
  has_one :photostream, dependent: :destroy
  has_many :photos, foreign_key: :uploader_id, dependent: :destroy
  has_many :photos_in_albums, through: :albums, source: :photos

  multisearchable against: [:email]

  pg_search_scope :search_by_email, against: :email

  validates :email, :password_digest, :session_token, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token
  before_save :create_photostream

  def self.find_by_credentials(email, password)
    user = User.find_by({email: email})

    user && user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    fname = auth_hash[:info][:name].split.first
    lname = auth_hash[:info][:name].split.last

    unless user
      user = User.create!(
              provider: auth_hash[:provider],
              uid: auth_hash[:uid],
              fname: fname,
              email: fname + lname + SecureRandom.urlsafe_base64(7),
              password: SecureRandom.urlsafe_base64)
      photostream = user.albums.create(title: 'Photostream')
      user.photostream_id = photostream.id
      user.save
    end

    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest.to_s).is_password?(password)
  end

  def reset_session_token
    self.session_token = SecureRandom.base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.base64
  end

  def cover_photo_url
    if cover_photo_id
      Photo.find(cover_photo_id).image.url(:original)
    else
      Photo::DEFAULT_PROFILE_COVER_IMAGE_URL
    end
  end

  def profile_pic_url
    if profile_pic_id
      Photo.find(profile_pic_id).image.url(:thumb)
    else
      Photo::DEFAULT_PROFILE_IMAGE_URL
    end
  end

  def create_photostream
    @photostream = Photostream.create!(title: 'Photostream', user_id: @user.id)
  end
end
