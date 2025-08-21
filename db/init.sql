-- Create test database for testing
CREATE DATABASE IF NOT EXISTS twitter_clone_test;
GRANT ALL PRIVILEGES ON twitter_clone_test.* TO 'twitter_clone'@'%';
FLUSH PRIVILEGES;
