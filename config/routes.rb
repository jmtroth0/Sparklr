Rails.application.routes.draw do
  # root to: redirect 

  resources :users, only: [:new, :create, :update, :show]
  resource :session, only: [:new, :create, :destroy]
end
