Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new]

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update]
    resources :albums, except: [:new, :edit]
    resources :photos, only: [:index, :create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end
end
