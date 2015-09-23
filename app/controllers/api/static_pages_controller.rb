
module Api
  class StaticPagesController < ApplicationController
    # before_action :require_signed_in!
    
    def search
      @search_results = PgSearch
        .multisearch(params[:query])
        .includes(:searchable)

      render :search
    end

    def user_search
      @search_results = PgSearch
        .search_by_email
        .includes(:searchable)

      render :search
    end
  end
end
