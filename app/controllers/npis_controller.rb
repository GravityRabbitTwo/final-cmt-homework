class NpisController < ApplicationController
  include HTTParty
  def index
    url = "https://npiregistry.cms.hhs.gov/api/?version=2.1"
    getRecords(url)
  end

  def show
    url = "https://npiregistry.cms.hhs.gov/api/?version=2.1&number=#{params[:id]}"
    getRecords(url)
  end

  private
  def getRecords(url)
    response = HTTParty.get(url)
    if response
      jsonResponse = JSON.parse(response)
      render json: jsonResponse
    else
      render ({code: 401, message: 'Invalid Request'})
    end
  end
end