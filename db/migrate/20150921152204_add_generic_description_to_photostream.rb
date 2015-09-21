class AddGenericDescriptionToPhotostream < ActiveRecord::Migration
  def change
    add_column :photostreams, :description, :text, default: "All your photos"
  end
end
