Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new]

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update] do
      get 'albums', to: 'albums#user_index'
      get 'photostream', to: 'photostreams#user_show'
    end
    resources :albums, except: [:new, :edit]
    get 'photostream', to: 'photostreams#show'
    resources :photos, except: [:new, :edit]
    resource :session, only: [:show, :create, :destroy]
  end
end
