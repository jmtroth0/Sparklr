class AddProfilePicToUser < ActiveRecord::Migration
  def change
    add_column :users, :profile_pic_id, :integer

    add_index :users, :profile_pic_id
  end
end
