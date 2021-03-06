class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable,
         :omniauth_providers => [:facebook, :google_oauth2]

  def self.from_facebook(auth)
    p auth
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      # Skip email confirmation, assumed to be confirmed already
      user.skip_confirmation!
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      # user.name = auth.info.name   # assuming the user model has a name
      # user.image = auth.info.image # assuming the user model has an image
    end
  end

  def self.from_google(auth)
    p auth
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      # Skip email confirmation, assumed to be confirmed already
      user.skip_confirmation!
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      # user.name = auth.info.name   # assuming the user model has a name
      # user.image = auth.info.image # assuming the user model has an image
    end
  end

end
