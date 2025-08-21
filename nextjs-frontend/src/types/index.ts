// API Types based on the Rails backend
export interface User {
  id: number;
  username: string;
  email: string;
  bio?: string;
  created_at: string;
}

export interface Murmur {
  id: number;
  content: string;
  created_at: string;
  user: User;
  likes_count: number;
  liked_by_current_user: boolean;
}

export interface Follow {
  id: number;
  follower_id: number;
  followed_id: number;
  created_at: string;
}

export interface Like {
  id: number;
  user_id: number;
  murmur_id: number;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface TimelineResponse {
  murmurs: Murmur[];
  suggested_users: SuggestedUser[];
}

export interface SuggestedUser {
  id: number;
  username: string;
  bio?: string;
  following: boolean;
}

export interface ProfileResponse {
  user: User;
  murmurs_count: number;
  followers_count: number;
  following_count: number;
  is_following: boolean;
  murmurs: Murmur[];
}

export interface FollowersResponse {
  user: User;
  followers: UserWithFollowStatus[];
}

export interface FollowingResponse {
  user: User;
  following: UserWithFollowStatus[];
}

export interface UserWithFollowStatus {
  id: number;
  username: string;
  bio?: string;
  is_following: boolean;
}

export interface ApiError {
  error: string;
  errors?: string[];
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  bio?: string;
}

export interface MurmurForm {
  content: string;
}
