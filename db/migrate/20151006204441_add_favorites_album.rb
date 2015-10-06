class AddFavoritesAlbum < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id
      t.references :favoriteable, polymorphic: true, index: true

      t.timestamps null: false
    end

    add_index :favorites, :user_id
  end
end
