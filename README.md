# Murmur: A Twitter-like Web Application

This project, "Murmur", is a web application similar to Twitter/X, allowing users to post "murmurs" (tweets), follow other users, and like murmurs. It has been developed as a coding test for a Ruby/Rails engineer position.

## Project Status (as of August 21, 2025)

This project fulfills most of the core requirements outlined in the coding test instructions. Key features like user authentication, posting murmurs, following/unfollowing users, liking/unliking murmurs, user profiles, and a personal timeline are implemented for both a web interface and a JSON API.

## 🚀 Quick Start with Docker (Recommended)

The easiest way to run this project is using Docker. No need to install Ruby, Node.js, or MySQL locally!

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Start the Application

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd murmur
   ```

2. **Quick start (automated):**
   ```bash
   # One-command setup
   ./start.sh
   ```

3. **Manual start:**
   ```bash
   # Option 1: Using Docker Compose directly
   docker-compose up -d
   
   # Option 2: Using the provided Makefile
   make up
   ```

4. **View the application:**
   - **Main App**: http://localhost:3000
   - **API Documentation**: http://localhost:3000/api-docs
   - **Database Admin (phpMyAdmin)**: http://localhost:8080

### Useful Docker Commands

```bash
# Build containers
make build

# Start services and show logs
make dev

# View logs
make logs

# Open Rails console
make console

# Open shell in Rails container
make shell

# Run tests
make test

# Stop all services
make down

# Clean up everything (containers, volumes, etc.)
make clean

# Restart fresh
make fresh
```

### What Docker Setup Includes

- **Rails Application** (Port 3000)
- **MySQL Database** (Port 3306)
- **phpMyAdmin** (Port 8080)
- **Auto-setup**: Database creation, migrations, and seeding
- **API Documentation**: Pre-generated Swagger docs
- **Asset Compilation**: Tailwind CSS and JavaScript bundling

## Application Screenshot

![Murmur App Screenshot](Screenshot%20from%202025-05-20%2023-40-04.png)

## Original Requirements Summary

The goal was to implement a web application with the following specifications:

**Core Functionality:**
- Users can follow other users.
- A timeline displays murmurs from followed users.
- Users can post murmurs.
- Only the user who posted can delete their murmur.
- Users can LIKE another person's murmur.
- [Optional] User authentication.

**Technical Stack:**
- Ruby 3.x or later
- Ruby on Rails 4.x or later
- MySQL
- Webpack
- Tailwind CSS

**DB:**
- Use `murmurs` and `users` tables, add columns as needed.
- Add more tables as necessary (e.g., for follows, likes).

**Server (REST API):**
- Implement RESTful API endpoints. Examples provided:
  - `[GET] /api/murmurs/`
  - `[POST] /api/me/murmurs/`
  - `[DELETE] /api/me/murmurs/:id/`

**Client (Web Interface):**
- **Timeline:** List murmurs (text, LIKE count), LIKE button, pagination (10 murmurs/page).
- **Murmur Detail:** Show murmur information.
- **Own User Detail:** User info (name, follow/followed count), list of own murmurs, delete button for own murmurs.
- **Other User Detail:** User info, list of their murmurs.

## Implemented Features & How Requirements Were Met

**1. Core Functionality:**
   - **User Follows:** Implemented (`Follow` model, `FollowsController`). Users can follow/unfollow. **(✓ Met)**
   - **Timeline:** Implemented (`MurmursController#timeline`). Displays murmurs from followed users and the current user's own murmurs, paginated. **(✓ Met)**
   - **Post Murmurs:** Implemented (`Murmur` model, `MurmursController`). Users can create murmurs. **(✓ Met)**
   - **Delete Own Murmur:** Implemented (`MurmursController#destroy` with `check_murmur_owner` authorization). **(✓ Met)**
   - **Like Murmurs:** Implemented (`Like` model, `LikesController`). Users can like/unlike murmurs. **(✓ Met)**
   - **User Authentication:** Implemented for both web (sessions) and API (JWT). (`AuthenticationController`, `JsonWebToken` lib). **(✓ Met - Optional requirement completed)**

**2. Technical Stack:**
   - **Ruby:** Project uses Ruby 3.4.3.
   - **Ruby on Rails:** Project uses Rails 8.0.2. **(✓ Met)**
   - **Database:** Currently uses **MySQL**. The requirement was **MySQL**. **(✓ Met)**
   - **JavaScript Bundling (Webpack):** Uses `importmap-rails` and `jsbundling-rails` (with esbuild), which are the modern Rails standards for JavaScript management, fulfilling the intent of using a JS bundler. **(✓ Met, via modern Rails equivalents)**
   - **Tailwind CSS:** Implemented and used for styling. **(✓ Met)**

**3. Database Structure:**
   - `users` table: Includes `username`, `email`, `password_digest`, `bio`.
   - `murmurs` table: Includes `content`, `user_id`.
   - Additional tables: `follows` and `likes` created to manage relationships.
   - **(✓ Met)**

**4. Server (REST API):**
   - A comprehensive JSON API is implemented, covering authentication, users, murmurs, follows, and likes.
   - API documentation is available via Swagger/Rswag.
   - **(✓ Met and Exceeded)**

**5. Client (Web Interface):**
   - **Timeline:** Implemented at `/` (root) and `/timeline`. Shows murmurs with content, user info, like counts, like/unlike buttons, and pagination (10 per page via Kaminari). **(✓ Met)**
   - **Murmur Detail:** A specific detail page for a single murmur (`MurmursController#show`) is available, though direct linking from the timeline might not be explicitly implemented. Data is available via API. **(Partially Met - Backend exists, UI linking can be enhanced)**
   - **Own User Detail (`/@username`):** Displays user info (username, bio, follower/following counts), lists own murmurs with like counts and delete buttons (if owner). **(✓ Met)**
   - **Other User Detail (`/@username`):** Displays user info, lists their murmurs with like counts. **(✓ Met)**
   - **Notifications:** Implemented using Toastify JS via a Stimulus controller (`toast_controller.js`) for flash messages, and a custom Stimulus controller (`notification_controller.js`) was also developed for more animated notifications (though `toast_controller.js` is the primary one for flash messages).

## Technologies Used in This Project

- **Backend:** Ruby 3.4.3, Rails 8.0.2
- **Database:** MySQL
- **Frontend:**
    - HTML (ERB)
    - Tailwind CSS
    - JavaScript (ES6+)
    - Stimulus JS
    - Hotwire/Turbo (implied)
    - Toastify JS (for notifications)
    - `importmap-rails` for JS module management
    - `jsbundling-rails` (with esbuild) for JS bundling
- **API Documentation:** Rswag (Swagger)
- **Authentication:** Custom JWT for API, Rails sessions for Web
- **Pagination:** Kaminari gem
- **Testing:** RSpec, FactoryBot
- **Containerization:** Docker, Docker Compose
- **Linters/Formatters:** RuboCop, Brakeman (security scanner)

## Setup and Installation

### Method 1: Docker (Recommended) ⚡

**Requirements**: Docker and Docker Compose only

```bash
# Clone and start
git clone <repository-url>
cd murmur
docker-compose up -d

# Access the app at http://localhost:3000
```

That's it! The Docker setup handles all dependencies, database setup, and asset compilation automatically.

### Method 2: Local Development Setup 🛠️

**Requirements**: Ruby 3.4.4+, Node.js 16+, MySQL/MariaDB

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd murmur
   ```

2. **Install dependencies:**
   ```bash
   # Install Ruby gems
   bundle install
   
   # Install Node.js packages
   yarn install
   ```

3. **Database Setup:**
   - Ensure MySQL/MariaDB server is running
   - Update `config/database.yml` with your database credentials
   - Setup database:
     ```bash
     rails db:create
     rails db:migrate
     rails db:seed
     ```

4. **Build assets:**
   ```bash
   # Build Tailwind CSS
   rails tailwindcss:build
   
   # Generate API documentation
   RAILS_ENV=test rails rswag:specs:swaggerize
   ```

5. **Start the development server:**
   ```bash
   rails server
   # OR use the dev script
   bin/dev
   ```

   The application will be available at `http://localhost:3000`

## Key Page Links

- **Timeline (Root):** `http://localhost:3000/`
- **Sign Up:** `http://localhost:3000/signup`
- **Login:** `http://localhost:3000/login`
- **User Profile:** `http://localhost:3000/@username` (e.g., `http://localhost:3000/@john_doe`)
- **API Documentation:** `http://localhost:3000/api-docs`

## Default Test Users (Created via Seeds)

After running `db:seed` or starting with Docker, you can log in with:

- **Username**: `john_doe` | **Email**: `john@example.com` | **Password**: `password123`
- **Username**: `jane_smith` | **Email**: `jane@example.com` | **Password**: `password123`
- **Username**: `bob_wilson` | **Email**: `bob@example.com` | **Password**: `password123`

## Development Workflow

### Running Tests
```bash
# With Docker
make test

# Local setup
bundle exec rspec
```

### API Documentation
The API is documented using Swagger/OpenAPI and is available at `/api-docs`. To regenerate:
```bash
# With Docker
docker-compose exec web bundle exec rails rswag:specs:swaggerize

# Local setup  
RAILS_ENV=test rails rswag:specs:swaggerize
```

### Database Management
```bash
# With Docker
docker-compose exec web bundle exec rails console
docker-compose exec web bundle exec rails db:migrate

# Access phpMyAdmin at http://localhost:8080
# User: root, Password: rootpassword

# Local setup
rails console
rails db:migrate
```

## API Documentation

The API documentation is available through Swagger UI at `/api-docs` when running the application. Here are the key endpoints:

### API Documentation

The API is documented using Swagger/OpenAPI. You can access the interactive documentation at `/api-docs` when running the server.

### Authentication Endpoints

#### Create Account
```http
POST /users
Content-Type: application/json

{
  "user": {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "bio": "Hello, I'm John!"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Murmurs Endpoints

#### List All Murmurs
```http
GET /api/murmurs
Authorization: Bearer your-token
```

Response:
```json
{
  "murmurs": [
    {
      "id": 1,
      "content": "Hello world!",
      "created_at": "2025-05-23T01:37:54.933Z",
      "user": {
        "id": 1,
        "username": "johndoe",
        "bio": "Hello, I'm John!"
      },
      "likes_count": 5,
      "liked_by_current_user": false
    }
  ]
}
```

#### Get Single Murmur
```http
GET /api/murmurs/:id
Authorization: Bearer your-token
```

Response:
```json
{
  "id": 1,
  "content": "Hello world!",
  "created_at": "2025-05-23T01:37:54.933Z",
  "user": {
    "id": 1,
    "username": "johndoe",
    "bio": "Hello, I'm John!"
  },
  "likes_count": 5,
  "liked_by_current_user": false
}
```

#### Create Murmur
```http
POST /api/murmurs
Authorization: Bearer your-token
Content-Type: application/json

{
  "content": "This is my first murmur!"
}
```

#### Delete Murmur
```http
DELETE /api/murmurs/:id
Authorization: Bearer your-token
```

### Timeline Endpoint

```http
GET /api/timeline
Authorization: Bearer your-token
```

Response:
```json
{
  "murmurs": [
    {
      "id": 1,
      "content": "Hello world!",
      "created_at": "2025-05-23T01:37:54.933Z",
      "user": {
        "id": 1,
        "username": "johndoe",
        "bio": "Hello, I'm John!"
      },
      "likes_count": 5,
      "liked_by_current_user": false
    }
  ]
}
```

### Profile Endpoints

#### View Profile
```http
GET /api/profile/:username
Authorization: Bearer your-token
```

#### View Followers
```http
GET /api/profile/:username/followers
Authorization: Bearer your-token
```

#### View Following
```http
GET /api/profile/:username/following
Authorization: Bearer your-token
```

### Social Interaction Endpoints

#### Follow User
```http
POST /api/follows
Authorization: Bearer your-token
Content-Type: application/json

{
  "followed_id": 123
}
```

#### Unfollow User
```http
DELETE /api/follows/:id
Authorization: Bearer your-token
```

#### Like Murmur
```http
POST /api/likes
Authorization: Bearer your-token
Content-Type: application/json

{
  "murmur_id": 123
}
```

#### Unlike Murmur
```http
DELETE /api/likes/:id
Authorization: Bearer your-token
```

## Development Setup

### Using Docker (Recommended)
```bash
git clone <repository-url>
cd murmur
make up  # or docker-compose up -d
```

### Local Development
```bash
git clone <repository-url>  
cd murmur
bundle install
yarn install
rails db:setup
rails tailwindcss:build
rails server
```

## Running Tests

### With Docker
```bash
make test
```

### Local Setup
```bash
bundle exec rspec
```

## Technologies Used

- **Backend:** Ruby 3.4.4, Rails 8.0.2
- **Database:** MySQL 8.0  
- **Frontend:** HTML (ERB), Tailwind CSS, Stimulus JS, Turbo
- **JavaScript:** ES6+, esbuild bundling, importmap-rails
- **API Documentation:** Rswag (Swagger/OpenAPI)
- **Authentication:** JWT for API, Rails sessions for Web
- **Testing:** RSpec, FactoryBot
- **Containerization:** Docker, Docker Compose
- **Other:** Kaminari (pagination), Toastify (notifications)

## Project Structure

```
murmur/
├── app/
│   ├── controllers/     # API and web controllers
│   ├── models/         # ActiveRecord models
│   ├── views/          # ERB templates
│   ├── javascript/     # Stimulus controllers
│   └── assets/         # Stylesheets and images
├── config/             # Rails configuration
├── db/                # Database migrations and seeds
├── spec/              # RSpec tests
├── public/api-docs/   # Generated API documentation
├── docker-compose.yml # Docker services configuration
├── Dockerfile.dev     # Development Docker image
└── Makefile          # Convenience commands
```

## Docker Services

- **web**: Rails application (port 3000)
- **db**: MySQL database (port 3307)  
- **phpmyadmin**: Database administration (port 8080)

## Environment Variables

When using Docker, these are set automatically:

- `DATABASE_HOST=db`
- `DATABASE_USERNAME=twitter_clone`
- `DATABASE_PASSWORD=twitter_clone_password`
- `DATABASE_NAME=twitter_clone_development`
- `RAILS_ENV=development`

## Deviation from Requirements

- **JavaScript Bundling (Webpack):** The original requirement specified "Webpack". This project utilizes `importmap-rails` and `jsbundling-rails` (with `esbuild`) for JavaScript management. These are modern Rails conventions that fulfill the role of a JavaScript bundler, offering an alternative to directly using Webpack, rather than a deviation in capability.

## Impressions & Potential Future Work

- The application provides a solid foundation for a Twitter-like platform.
- The API is well-structured and documented with Swagger.
- The web interface is functional, leveraging Hotwire/Turbo and Stimulus for modern interactivity.
- **Docker support** makes it easy to run without local setup hassles.
- **Future Enhancements could include:**
    - Real-time updates (e.g., ActionCable for new murmurs/notifications).
    - More advanced search functionality.
    - Direct messaging.
    - Hashtags and mentions.
    - Richer user profiles (e.g., profile pictures, header images).
    - Admin panel.
    - Mobile app API optimizations.
    - Redis caching layer.
    - Background job processing.

## Summary

This Twitter clone provides a complete social media experience with:

✅ **Core Features**: User auth, posting, following, liking, timelines  
✅ **Modern Tech Stack**: Rails 8, MySQL, Tailwind CSS, Stimulus  
✅ **API-First Design**: Full REST API with Swagger documentation  
✅ **Easy Deployment**: Docker containerization with one-command setup  
✅ **Test Coverage**: RSpec test suite with API documentation generation  
✅ **Production Ready**: Optimized Docker builds, security best practices

**Getting Started**: Just run `./start.sh` and visit http://localhost:3000 🚀

