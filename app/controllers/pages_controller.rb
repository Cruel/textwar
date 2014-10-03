class PagesController < ApplicationController
  # before_action :authenticate_user!

  def index
    render layout: "headless"
  end

  def about
  end
end
