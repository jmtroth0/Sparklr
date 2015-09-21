class Photostream < ActiveRecord::Base
  validates :title, :user_id, presence: true

  belongs_to :user
  has_many :photos, through: :user, source: :photos
end
