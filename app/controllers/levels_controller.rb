class LevelsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    levels = Level.all
    respond_with levels
  end

  def show
    respond_with Level.friendly.find(params[:id])
  end

end