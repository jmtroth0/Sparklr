module Api
  class PhotostreamsController < ApplicationController
    def show
      @photostream = current_user.photostream
    end

    def user_show
      @photostream = User.find(params[:user_id]).photostream
      render :show
    end
  end
end
