class Favorite < ActiveRecord::Base
  validates :favoriteable_id, :favoriteable_type, :user_id, presence: true
  validates :user_id, uniqueness: {
    scope: [:favoriteable_id, :favoriteable_type],
    message: "Can't have multiple likes. Probably something wrong on our side. Sorry!"
  }

  belongs_to :favoriteable, polymorphic: true
  belongs_to :user
end
