module Api
  class PhotosController < ApiController
    wrap_parameters false

    def create
      @photo = Photo.new(photo_params)
      @photo.uploader_id = current_user.id
      @photo.save!
      AlbumPhoto.create!({
        album_id: params[:photo][:album_id],
        photo_id: @photo.id
      })
      render :show
    end

    def update
      @photo = Photo.find(params[:id])
      @photo.update!(photo_params)
      render :show
    end

    def destroy
      @photo = Photo.find(params[:id])
      @photo.destroy!
      render :show
    end

    private

    def photo_params
      params.require(:photo).permit(:id, :title, :description, :image)
    end
  end
end
