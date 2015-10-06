module Api
  class FavoritesController < ApiController
    def create
      @favorite = Favorite.new(fave_params)
      @favorite.user_id = current_user.id
      if !@favorite.save
        render json: liking.errors.full_messages, status: 422
      end
    end

    def destroy
      @favorite = Favorite.find(params[:id])
      @favorite.destroy!
    end

    def index
      @user = User.find(params[:user_id])
      @favorites = @user.favorite_photos
      render :index
    end

    private

    def fave_params
      params.require(:favorite).permit(:favoriteable_id, :favoriteable_type)
    end
  end
end
