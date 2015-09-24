module Api
  class UsersController < ApplicationController

    def update
      @user = User.find(params[:id])

      if @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @user = User.find(params[:id])
    end

    def create
      @user = User.new(user_params)
      if @user.save
        sign_in(@user)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(
        :email, :password, :fname, :profile_pic_id, :cover_photo_id
      )
    end
  end
end
