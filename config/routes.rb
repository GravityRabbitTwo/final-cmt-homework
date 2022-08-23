Rails.application.routes.draw do
  get 'home/index'
  get '/npis/:id', to: 'npis#show', :defaults => { :format => :json }
end
