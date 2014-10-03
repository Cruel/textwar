class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  layout false

  def facebook
    @user = User.from_omniauth(request.env['omniauth.auth'])
    p request.env["omniauth.auth"]

    if @user.persisted?
      p 'persisted'
      sign_in @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
      p 'success'
    else
      session['devise.facebook_data'] = request.env['omniauth.auth']
      p 'facebook fail!'
      redirect_to '/'
    end
  end

  def failure
    @error = params['error_description']
  end
end