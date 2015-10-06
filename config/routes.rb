Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new]

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update] do
      get 'albums', to: 'albums#user_index'
      get 'photostream', to: 'photostreams#user_show'
      get 'favorites', to: 'favorites#user_index'
    end
    resources :albums, except: [:new, :edit]
    get 'photostream', to: 'photostreams#show'
    resources :favorites, only: [:create, :destroy, :index]
    get "photos/recent", to: "photos#recent_photos"
    resources :photos, except: [:new, :edit] do
      get 'albums', to: "photos#albums"
    end
    resource :session, only: [:show, :create, :destroy]
    get "/search", to: "static_pages#search"
    get "/user_search", to: "static_pages#user_search"
  end
end
