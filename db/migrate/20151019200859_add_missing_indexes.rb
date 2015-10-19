class AddMissingIndexes < ActiveRecord::Migration
  def change
    add_index :album_photos, [:photo_id, :album_id]
    add_index :favorites, [:favoriteable_id, :favoriteable_type, :user_id],
      name: "index_favorites_on_favorite_and_user_id"
    add_index :photostreams, :user_id
    add_index :pg_search_documents, [:searchable_id, :searchable_type]
  end
end
