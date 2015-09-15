class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :title, null: false
      t.text :description
      t.string :privacy, null: false, default: "private"
      t.integer :uploader_id, null: false

      t.timestamps null: false
    end

    add_index :photos, :uploader_id
  end
end
