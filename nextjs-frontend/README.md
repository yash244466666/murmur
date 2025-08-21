# Murmur Frontend - Next.js TypeScript

A modern, responsive frontend for the Murmur Twitter-clone application built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Authentication**: JWT token-based authentication with persistent sessions
- **Real-time UI**: Optimistic updates and seamless user experience
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icons for consistent iconography

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Authentication**: JWT tokens with js-cookie

## 🔧 Setup & Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running Rails API backend (on http://localhost:3000)

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd nextjs-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3001
   ```

## 🌐 API Integration

The frontend integrates with the Rails API through:

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /users` - User registration

### Murmur Endpoints
- `GET /api/timeline` - Get timeline with followed users' murmurs
- `GET /api/murmurs` - Get current user's murmurs
- `POST /api/murmurs` - Create new murmur
- `DELETE /api/murmurs/:id` - Delete murmur

### Social Features
- `POST /api/murmurs/:id/like` - Like/unlike murmur
- `POST /api/follows` - Follow user
- `DELETE /api/follows/:id` - Unfollow user

### User Profiles
- `GET /api/profile/:username` - Get user profile
- `GET /api/profile/:username/followers` - Get followers
- `GET /api/profile/:username/following` - Get following

## 🎨 UI Components

### Core Components

- **MurmurCard**: Displays individual murmurs with like/delete actions
- **MurmurForm**: Form for creating new murmurs with character counter
- **Navbar**: Navigation with authentication state
- **ProfileSidebar**: User profile summary with stats
- **SuggestedUserCard**: User suggestions with follow buttons

### Pages

- **Timeline**: Main feed with three-column layout
- **Login/Signup**: Authentication forms with validation
- **Profile**: User profiles with murmurs and stats

## 🔐 Authentication Flow

1. **Login/Signup**: User submits credentials
2. **JWT Token**: Backend returns JWT token and user data
3. **Storage**: Token stored in httpOnly cookie
4. **Authorization**: Token sent in Authorization header
5. **Auto-redirect**: Unauthenticated users redirected to login

## 📱 Features

### Timeline
- Three-column responsive layout
- New murmur creation form
- Real-time character counting
- Infinite scroll ready (pagination implemented)
- Suggested users sidebar

### Authentication
- Secure JWT token handling
- Form validation with Zod
- Error handling and display
- Persistent sessions

### Murmurs
- Create, delete murmurs
- Like/unlike functionality
- Character limit enforcement (280 chars)
- Optimistic UI updates

### Social Features
- Follow/unfollow users
- User profiles with stats
- Followers/following lists
- User suggestions

### Responsive Design
- Mobile-first approach
- Collapsible sidebars
- Touch-friendly interactions
- Progressive enhancement

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

This frontend provides a complete, modern interface for the Murmur social media platform with production-ready features and excellent developer experience.
