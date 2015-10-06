class Favorite < ActiveRecord::Base
  validates :favoriteable_id, :favoriteable_type, :user_id, presence: true
  belongs_to :favoriteable, polymorphic: true
  belongs_to :user
end
