module Api
  class PhotosController < ApiController
    wrap_parameters false

    def index
      @photos = current_user.photos
    end

    def recent_photos
      @photos = Photo.all.order(id: :desc).page(params[:page]).per(6)
      render :recent_photos
    end

    def albums
      @photo = Photo.find(params[:photo_id]);
      @albums = @photo.albums
      render :albums
    end

    def create
      @photo = current_user.photos.create!(photo_params)
      render :show
    end

    def show
      @photo = Photo.find(params[:id])
      width, height = @photo.dimensions
    end

    def update
      @photo = Photo.find(params[:id])
      @photo.update!(photo_params)
      render :show
    end

    def destroy
      @photo = current_user.photos.find(params[:id])
      @photo.destroy!
      render :show
    end

    private

    def photo_params
      params.require(:photo).permit(
        :id, :title, :description, :image, :dimensions, album_ids: []
      )
    end
  end
end
