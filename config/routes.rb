Rails.application.routes.draw do


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/welcome' => 'sessions#new'

  get '/login' => 'login_page#new'
    post '/login' => 'login_page#create'
    get '/logout' => 'sessions#destroy'


  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get '/users/new' => 'users#new'

end
