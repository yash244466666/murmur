class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session, if: -> { request.format.json? }
  before_action :authenticate_user!
  helper_method :current_user, :user_signed_in?

  private

  def authenticate_user!
    return authenticate_api_request if request.format.json?
    
    unless current_user
      store_location
      redirect_to login_path, alert: "Please sign in to continue."
    end
  end

  def current_user
    return @current_user if defined?(@current_user)
    
    if session[:user_id]
      @current_user = User.find_by(id: session[:user_id])
      Rails.logger.info "🔍 ApplicationController: Found user via session: #{@current_user&.username}"
    elsif (header = request.headers['Authorization'])
      Rails.logger.info "🔍 ApplicationController: Authorization header found: #{header}"
      token = header.split(' ').last
      Rails.logger.info "🔍 ApplicationController: Extracted token: #{token[0..20]}..."
      decoded = JsonWebToken.decode(token)
      Rails.logger.info "🔍 ApplicationController: Decoded token: #{decoded}"
      @current_user = User.find_by(id: decoded[:user_id]) if decoded
      Rails.logger.info "🔍 ApplicationController: Found user via JWT: #{@current_user&.username}"
    end
    
    Rails.logger.info "🔍 ApplicationController: Final current_user: #{@current_user&.username}"
    @current_user
  end

  def user_signed_in?
    !!current_user
  end

  def authenticate_api_request
    unless current_user
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def store_location
    session[:return_to] = request.fullpath if request.get?
  end

  def stored_location_or(default)
    session.delete(:return_to) || default
  end
end
