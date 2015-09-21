module Api
  class PhotostreamsController < ApplicationController
    def show
      @photostream = current_user.photostream
    end
  end
end
