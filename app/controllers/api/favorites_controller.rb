module Api
  class FavoritesController < ApiController
    def create
      @favorite = Favorite.new(fave_params)
      @favorite.user_id = current_user.id
      if @favorite.save
        render json: {}

      else
        render json: @favorite.errors.full_messages, status: 422
      end
    end

    def destroy
      @favorite = Favorite.find_by(
        favoriteable_id: params[:favorite][:favoriteable_id],
        favoriteable_type: params[:favorite][:favoriteable_type]
      )
      if @favorite
        @favorite.try :destroy
        render json: {}
      else
        render json: {}, status: 422
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
