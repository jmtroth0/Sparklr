module Api
  class UsersController < ApplicationController

    def update
      # might implement once I'm using backbone
    end

    def show
      @user = User.find(params[:id])
    end

    def create
      @user = User.new(user_params)
      if @user.save
        @photostream = @user.albums.create(title: 'Photostream')
        @user.photostream_id = @photostream.id
        @user.save
        sign_in(@user)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :fname)
    end
  end
end
