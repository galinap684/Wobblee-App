Rails.application.routes.draw do


  #
  get '/graphics' => 'graphics#show'
  #
  #   get '/last' => 'last#new'
  #
  #
  #   get '/welcome' => 'sessions#new'
  #
  #   get '/login' => 'login_page#new'
  #   post '/login' => 'login_page#create'
  #   get '/logout' => 'sessions#destroy'
  #
  #
  # get '/signup' => 'users#new'
  # post '/users' => 'users#create'
  # get '/users/new' => 'users#new'
  #
  # #get '/play_game' => 'users#play_game'
  #
  get '/game_result' => 'users#game_result'

  get '/welcome' => 'sessions#new'

  get '/login' => 'login_page#new'
    post '/login' => 'login_page#create'
    get '/logout' => 'sessions#destroy'


  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get '/users/new' => 'users#new'

  get '/play_game' => 'users#play_game'

  get '/game_result' => 'users#game_result'


end
