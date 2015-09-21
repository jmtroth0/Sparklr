class CreatePhotostreams < ActiveRecord::Migration
  def change
    create_table :photostreams do |t|
      t.string :title, null: false, default: 'PhotoStream'
      t.integer :user_id, null: false
      t.timestamps null: false
    end

    remove_column :users, :photostream_id
  end
end
