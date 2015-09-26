module Api
  class PhotostreamsController < ApplicationController
    def show
      @photostream = current_user.photostream.includes(:photos)
    end

    def user_show
      @photostream = User.find(params[:user_id]).photostream.includes(:photos)
      render :show
    end
  end
end
