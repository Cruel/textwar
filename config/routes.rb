Rails.application.routes.draw do

  scope :api do
    resources :levels, defaults: {format: :json}
  end

  get 'pages/index'
  root 'pages#index'

  get 'pages/auth_failure', as: 'auth_failure'

  devise_for :users, path: 'auth',
    :controllers => {
      omniauth_callbacks: 'omniauth_callbacks'
    }

  # Catch-all to let Angular do the work
  get '*path' => 'pages#index'

end
