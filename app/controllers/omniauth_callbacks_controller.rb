class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  layout false

  def facebook
    @user = User.from_facebook(request.env['omniauth.auth'])
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

  def google_oauth2
    @user = User.from_google(request.env["omniauth.auth"])

    if @user.persisted?
      # flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
      sign_in @user, :event => :authentication
    else
      session["devise.google_data"] = request.env["omniauth.auth"]
      redirect_to auth_failure_path(error: 'error')
    end
  end

  def after_omniauth_failure_path_for(scope)
    new_session_path(scope)
  end

  def failure
    redirect_to auth_failure_path(error: params['error_description'] || 'Authentication failed.')
  end
end