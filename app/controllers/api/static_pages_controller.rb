
module Api
  class StaticPagesController < ApplicationController
    # before_action :require_signed_in!

    def search
      @search_results = PgSearch
        .multisearch(params[:query])
        .includes(:searchable)
        .page(params[:page])
        .per(16)

      render :search
    end

    def user_search
      @search_results = User
        .search_by_email(params[:query])

      render :user_search
    end
  end
end
