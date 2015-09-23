class AddCoverPhotoIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cover_photo_id, :integer
  end
end
