module Api
  class PhotosController < ApiController
    wrap_parameters false

    def create
      @post = Post.create!(post_params)
      render :show
    end

    def update
      @post = Post.find(params[:id])
      @post.update!(post_params)
      render :show
    end

    def destroy
      @post = Post.find(params[:id])
      @post.destroy!
      render :show
    end

    private

    def photo_params
      params.require(:photo).permit(:id, :title, :description, :uploader_id, :image)
    end
  end
end
