class FavoritesController < ApplicationController
  def create
    favorite = Favorite.new(fave_params)
    favorite.user_id = current_user.id
    if !favorite.save
      render json: liking.errors.full_messages, status: 422
    end
  end

  def destroy

  end

  def index

  end

  def user_index

  end

  private

  def fave_params
    params.require(:favorite).permit(:favoriteable_id, :favoriteable_type)
  end
end
