module Api
  class FavoritesController < ApiController
    def create
      @favorite = current_user.favorites.new(fave_params)
      if @favorite.save
        render json: {}
      else
        render json: @favorite.errors.full_messages, status: 422
      end
    end

    def destroy
      @favorite = current_user.favorites.find_by(
        favoriteable_id: params[:favorite][:favoriteable_id],
        favoriteable_type: params[:favorite][:favoriteable_type]
      )
      if @favorite
        @favorite.destroy
        render json: {}
      else
        render json: "Can't find " + params[:favorite][:favoriteable_type], status: 422
      end
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
