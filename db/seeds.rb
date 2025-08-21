# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#
# Create test users
puts "Creating users..."
user1 = User.find_or_create_by!(username: "john_doe") do |user|
  user.email = "john@example.com"
  user.password = "password123"
  user.bio = "Just a regular guy tweeting about life"
end

user2 = User.find_or_create_by!(username: "jane_smith") do |user|
  user.email = "jane@example.com"
  user.password = "password123"
  user.bio = "Tech enthusiast and coffee lover"
end

user3 = User.find_or_create_by!(username: "bob_wilson") do |user|
  user.email = "bob@example.com"
  user.password = "password123"
  user.bio = "Professional cloud watcher"
end

# Create some murmurs
puts "Creating murmurs..."
murmur1 = user1.murmurs.find_or_create_by!(content: "Hello world! This is my first murmur!")

murmur2 = user2.murmurs.find_or_create_by!(content: "Just learned something new about Ruby on Rails!")

murmur3 = user3.murmurs.find_or_create_by!(content: "Beautiful day for coding!")

# Create follow relationships
puts "Creating follow relationships..."
user1.active_follows.find_or_create_by!(followed: user2)
user2.active_follows.find_or_create_by!(followed: user3)
user3.active_follows.find_or_create_by!(followed: user1)

# Create some likes
puts "Creating likes..."
user1.likes.find_or_create_by!(murmur: murmur2)
user2.likes.find_or_create_by!(murmur: murmur3)
user3.likes.find_or_create_by!(murmur: murmur1)

puts "Seed data created successfully!"
