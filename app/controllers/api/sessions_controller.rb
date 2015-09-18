module Api
  class SessionsController < ApplicationController
    def new
      @user = User.new
    end

    def show
      if current_user
        render :show
      else
        render json: {}
      end
    end

    def create
      @user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
      )

      if @user
        sign_in @user
        flash[:notice] = ["Welcome back"]
        render :show
      else
        render json: @album.errors.full_messages, status: :unprocessable_entity
        render :new
      end
    end

    def destroy
      sign_out
      render json: {}
    end
  end
end
