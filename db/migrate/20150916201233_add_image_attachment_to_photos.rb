class AddImageAttachmentToPhotos < ActiveRecord::Migration
  def up
    add_attachment :photos, :image
    remove_column :photos, :privacy
  end

  def down
    remove_attachment :photos, :image
    add_column :photos, :privacy
  end
end
