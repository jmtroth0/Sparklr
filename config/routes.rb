Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new]


  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update]
    resources :albums, except: [:new, :edit]
    resources :photos, only: [:create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end
end
