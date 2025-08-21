import api from "@/lib/api";
import {
  AuthResponse,
  LoginForm,
  SignupForm,
  Murmur,
  MurmurForm,
  TimelineResponse,
  ProfileResponse,
  FollowersResponse,
  FollowingResponse,
} from "@/types";

// Authentication APIs
export const authApi = {
  login: async (credentials: LoginForm): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  signup: async (userData: SignupForm): Promise<AuthResponse> => {
    const response = await api.post("/users", userData);
    return response.data;
  },
};

// Murmurs APIs
export const murmursApi = {
  getMyMurmurs: async (): Promise<Murmur[]> => {
    const response = await api.get("/api/murmurs");
    return response.data;
  },

  getMurmur: async (id: number): Promise<Murmur> => {
    const response = await api.get(`/api/murmurs/${id}`);
    return response.data;
  },

  createMurmur: async (murmurData: MurmurForm): Promise<Murmur> => {
    const response = await api.post("/api/murmurs", {
      content: murmurData.content,
    });
    return response.data;
  },

  deleteMurmur: async (id: number): Promise<void> => {
    await api.delete(`/api/murmurs/${id}`);
  },

  getTimeline: async (): Promise<TimelineResponse> => {
    const response = await api.get("/api/timeline");
    return response.data;
  },
};

// Likes APIs
export const likesApi = {
  likeMurmur: async (murmurId: number): Promise<void> => {
    await api.post(`/api/murmurs/${murmurId}/like`);
  },

  unlikeMurmur: async (murmurId: number): Promise<void> => {
    await api.delete(`/api/murmurs/${murmurId}/like`);
  },
};

// Follows APIs
export const followsApi = {
  followUser: async (userId: number): Promise<void> => {
    await api.post("/api/follows", { followed_id: userId });
  },

  unfollowUser: async (userId: number): Promise<void> => {
    await api.delete(`/api/follows/${userId}`);
  },
};

// Users APIs
export const usersApi = {
  getProfile: async (username: string): Promise<ProfileResponse> => {
    const response = await api.get(`/api/profile/${username}`);
    return response.data;
  },

  getFollowers: async (username: string): Promise<FollowersResponse> => {
    const response = await api.get(`/api/profile/${username}/followers`);
    return response.data;
  },

  getFollowing: async (username: string): Promise<FollowingResponse> => {
    const response = await api.get(`/api/profile/${username}/following`);
    return response.data;
  },
};
