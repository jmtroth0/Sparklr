module Api
  class PhotosController < ApiController
    def create
      
    end

    def update

    end

    def destroy

    end

    private

    def photo_params
      params.require(:photo).permit(:id, :title, :description, :privacy, :uploader_id)
    end
  end
end
