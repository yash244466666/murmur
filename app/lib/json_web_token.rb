class JsonWebToken
  SECRET_KEY = Rails.application.credentials.secret_key_base || Rails.application.secret_key_base || 'fallback_secret_key_for_development'

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    Rails.logger.info "🔍 JsonWebToken: Encoding with secret key available: #{!!SECRET_KEY}"
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    Rails.logger.info "🔍 JsonWebToken: Attempting to decode token: #{token[0..20]}..."
    Rails.logger.info "🔍 JsonWebToken: Using secret key available: #{!!SECRET_KEY}"
    decoded = JWT.decode(token, SECRET_KEY)[0]
    result = HashWithIndifferentAccess.new(decoded)
    Rails.logger.info "🔍 JsonWebToken: Successfully decoded: #{result}"
    result
  rescue JWT::DecodeError => e
    Rails.logger.error "🚨 JsonWebToken: Decode error: #{e.message}"
    Rails.logger.error "🚨 JsonWebToken: Secret key being used: #{SECRET_KEY&.length} chars"
    nil
  end
end
