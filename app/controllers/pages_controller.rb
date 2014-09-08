class PagesController < ApplicationController
  # before_action :authenticate_user!

  def home
    render layout: "headless"
  end

  def about
  end
end
