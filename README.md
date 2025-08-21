# Murmur: A Twitter-like Web Application

This project, "Murmur", is a web application similar to Twitter/X, allowing users to post "murmurs" (tweets), follow other users, and like murmurs. It has been developed as a coding test for a Ruby/Rails engineer position.

## Project Status (as of August 22, 2025)

This project fulfills all core requirements outlined in the coding test instructions and now includes a **modern Next.js frontend** in addition to the original Rails web interface. Key features like user authentication, posting murmurs, following/unfollowing users, liking/unliking murmurs, user profiles, and a personal timeline are implemented across three interfaces:

1. **Rails Web Interface** (Original) - Server-rendered HTML with Stimulus JS
2. **JSON REST API** - Comprehensive API with JWT authentication  
3. **Next.js Frontend** (New) - Modern React-based SPA with TypeScript

## Next.js Frontend Features

The project now includes a cutting-edge **Next.js 15** frontend application with:

### ✨ Modern Tech Stack
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **TanStack React Query** for state management
- **React Hook Form** with Zod validation
- **Axios** for HTTP requests
- **Lucide React** for icons

### 🎯 Enhanced User Experience  
- **Responsive Design** - Mobile-first approach
- **Real-time Updates** - Optimistic UI updates
- **Modern UI Components** - Clean, Twitter-like interface
- **Avatar Integration** - UI Avatars API for profile pictures
- **Toast Notifications** - User feedback for actions
- **Loading States** - Smooth UX with skeleton loaders

### 🔐 Advanced Authentication
- **JWT Token Management** - Secure API authentication
- **Auto-refresh Tokens** - Seamless session handling
- **Protected Routes** - Route-based authentication guards
- **Form Validation** - Client-side validation with server sync

### 📱 Key Pages & Features
- **Timeline** (`/`) - Infinite scroll feed with real-time updates
- **User Profiles** (`/profile/[username]`) - Detailed user pages
- **Authentication** (`/login`, `/signup`) - Modern auth flows
- **Responsive Navigation** - Mobile-friendly sidebar and top nav
- **Following Lists** - View followers/following with follow buttons

### 🚀 Performance Optimized
- **Server Components** - Next.js 15 optimizations
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Caching Strategy** - React Query with background updates

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
   - **Rails Web App**: http://localhost:3000
   - **Next.js Frontend**: http://localhost:3001  
   - **API Documentation**: http://localhost:3000/api-docs
   - **Database Admin (phpMyAdmin)**: http://localhost:8080

### Next.js Frontend Setup

The modern Next.js frontend is located in the `nextjs-frontend/` directory and runs independently:

```bash
# Start the Next.js frontend (in a new terminal)
cd nextjs-frontend
npm install
npm run dev

# Access at http://localhost:3001
```

**Frontend Environment Setup:**
Create `nextjs-frontend/.env.local`:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

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
- TypeScript
- Ruby on Rails 4.x or later
- Next.JS
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

### Backend Stack
- **Backend:** Ruby 3.4.3, Rails 8.0.2
- **Database:** MySQL
- **API Documentation:** Rswag (Swagger)
- **Authentication:** Custom JWT for API, Rails sessions for Web
- **Pagination:** Kaminari gem
- **Testing:** RSpec, FactoryBot
- **Linters/Formatters:** RuboCop, Brakeman (security scanner)

### Frontend Stacks

#### Next.js Frontend (Modern SPA)
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS  
- **State Management:** TanStack React Query
- **Form Handling:** React Hook Form with Zod validation
- **HTTP Client:** Axios with interceptors
- **Icons:** Lucide React
- **Avatar Service:** UI Avatars API
- **Build Tool:** Built-in Next.js compiler

#### Rails Frontend (Original)
- **Templates:** HTML (ERB)
- **Styling:** Tailwind CSS
- **JavaScript:** ES6+ with Stimulus JS
- **Bundling:** `importmap-rails`, `jsbundling-rails` (esbuild)
- **Interactivity:** Hotwire/Turbo
- **Notifications:** Toastify JS

### Infrastructure
- **Containerization:** Docker, Docker Compose
- **Development:** Hot reload for both Rails and Next.js

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

## Key Application Links

### Rails Web Interface
- **Timeline (Root):** `http://localhost:3000/`
- **Sign Up:** `http://localhost:3000/signup`
- **Login:** `http://localhost:3000/login`
- **User Profile:** `http://localhost:3000/@username` (e.g., `http://localhost:3000/@john_doe`)

### Next.js Frontend
- **Timeline:** `http://localhost:3001/`
- **Login:** `http://localhost:3001/login`
- **Sign Up:** `http://localhost:3001/signup`
- **User Profile:** `http://localhost:3001/profile/username` (e.g., `http://localhost:3001/profile/john_doe`)
- **Following List:** `http://localhost:3001/profile/username/following`

### API & Documentation
- **API Documentation:** `http://localhost:3000/api-docs`
- **Database Admin:** `http://localhost:8080` (phpMyAdmin)

## Default Test Users (Created via Seeds)

After running `db:seed` or starting with Docker, you can log in with:

- **Username**: `john_doe` | **Email**: `john@example.com` | **Password**: `password123`
- **Username**: `jane_smith` | **Email**: `jane@example.com` | **Password**: `password123`
- **Username**: `bob_wilson` | **Email**: `bob@example.com` | **Password**: `password123`

## Development Workflow

### Running Both Frontends

#### Option 1: Rails Only (Original)
```bash
# With Docker
make up

# Local setup
rails server
# Visit http://localhost:3000
```

#### Option 2: Next.js Frontend + Rails API
```bash
# Terminal 1: Start Rails API
make up  # or rails server

# Terminal 2: Start Next.js frontend  
cd nextjs-frontend
npm run dev
# Visit http://localhost:3001
```

#### Option 3: Full Development Setup
```bash
# Start all services with hot reload
make dev  # Rails + Docker services

# In another terminal
cd nextjs-frontend && npm run dev  # Next.js frontend
```

### Running Tests
```bash
# Rails tests (with Docker)
make test

# Rails tests (local setup)
bundle exec rspec

# Next.js tests (if implemented)
cd nextjs-frontend
npm test
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
├── app/                    # Rails application
│   ├── controllers/        # API and web controllers
│   ├── models/            # ActiveRecord models
│   ├── views/             # ERB templates (Rails frontend)
│   ├── javascript/        # Stimulus controllers
│   └── assets/            # Stylesheets and images
├── nextjs-frontend/       # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js 15 App Router pages
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts (Auth, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and API client
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json       # Node.js dependencies
├── config/                # Rails configuration
├── db/                   # Database migrations and seeds
├── spec/                 # RSpec tests
├── public/api-docs/      # Generated API documentation
├── docker-compose.yml    # Docker services configuration
├── Dockerfile.dev        # Development Docker image
└── Makefile             # Convenience commands
```

### Next.js Frontend Architecture

```
nextjs-frontend/src/
├── app/                   # App Router (Next.js 15)
│   ├── (auth)/           # Auth layout group
│   │   ├── login/        # Login page
│   │   └── signup/       # Signup page
│   ├── profile/          # User profile pages
│   │   └── [username]/   # Dynamic user routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home/Timeline page
├── components/            # Reusable React components
│   ├── auth/             # Authentication components
│   ├── murmurs/          # Murmur-related components
│   ├── ui/               # UI components (buttons, forms)
│   └── users/            # User-related components
├── contexts/             # React Context providers
│   └── AuthContext.tsx   # Authentication state
├── hooks/                # Custom React hooks
│   ├── useAuth.ts        # Authentication hooks
│   ├── useMurmurs.ts     # Murmur management hooks
│   └── useUsers.ts       # User management hooks
├── lib/                  # Utilities and configurations
│   ├── api-client.ts     # API client with Axios
│   ├── api.ts            # Axios configuration
│   └── utils.ts          # Utility functions
└── types/                # TypeScript definitions
    └── index.ts          # API response types
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

This Twitter clone now provides **two complete frontend experiences** plus a comprehensive API:

### 🎯 Three-Tier Architecture
✅ **Rails Web Interface**: Traditional server-rendered HTML with Stimulus  
✅ **Next.js Frontend**: Modern React SPA with TypeScript  
✅ **REST API**: Complete JSON API with JWT authentication

### 🚀 Enhanced Features
✅ **Dual Authentication**: JWT for API, Sessions for Rails web  
✅ **Modern UI/UX**: Responsive design with Tailwind CSS  
✅ **Real-time Updates**: Optimistic UI with React Query  
✅ **Type Safety**: Full TypeScript integration  
✅ **Mobile-First**: Responsive design across all screen sizes  

### 📱 Complete Social Media Experience
✅ **Core Features**: User auth, posting, following, liking, timelines  
✅ **User Profiles**: Detailed profiles with follower/following lists  
✅ **Avatar System**: Integrated UI Avatars for profile pictures  
✅ **Modern Navigation**: Sidebar navigation with user context  
✅ **Form Validation**: Client and server-side validation  

### 🛠️ Developer Experience  
✅ **Easy Setup**: Docker containerization with one-command setup  
✅ **Hot Reload**: Both Rails and Next.js development servers  
✅ **API Documentation**: Interactive Swagger documentation  
✅ **Test Coverage**: RSpec test suite with factory patterns  
✅ **Type Safety**: TypeScript for frontend development  

### 🏗️ Production Ready
✅ **Docker Deployment**: Optimized containers for production  
✅ **Security Best Practices**: JWT tokens, CORS, input validation  
✅ **Performance Optimized**: Code splitting, caching, optimized images  
✅ **Scalable Architecture**: Separate frontend and API services  

**Getting Started**: 
- **Rails Only**: Run `./start.sh` and visit http://localhost:3000 🚀  
- **Modern Stack**: Run `make up` + `cd nextjs-frontend && npm run dev` and visit http://localhost:3001 ✨

