class AddPhotostreamAlbumToUserTable < ActiveRecord::Migration
  def change
    add_column :users, :photostream_id, :integer
    add_index :users, :photostream_id, unique: true
  end
end
