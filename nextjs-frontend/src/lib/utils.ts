import { User } from "@/types";
import Cookies from "js-cookie";

export const authUtils = {
  setAuthToken: (token: string) => {
    Cookies.set("auth_token", token, { expires: 1 }); // 1 day
  },

  getAuthToken: (): string | undefined => {
    return Cookies.get("auth_token");
  },

  removeAuthToken: () => {
    Cookies.remove("auth_token");
    Cookies.remove("current_user");
  },

  setCurrentUser: (user: User) => {
    Cookies.set("current_user", JSON.stringify(user), { expires: 1 });
  },

  getCurrentUser: (): User | null => {
    const userStr = Cookies.get("current_user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get("auth_token");
  },
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays < 7) return `${diffInDays}d`;

  return date.toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const generateAvatar = (username: string): string => {
  // Generate a simple avatar URL using the username
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  const colorIndex = username.charCodeAt(0) % colors.length;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    username
  )}&background=${colors[colorIndex]
    .replace("bg-", "")
    .replace("-500", "")}&color=fff&size=128`;
};

export const validateMurmur = (
  content: string
): { isValid: boolean; error?: string } => {
  if (!content.trim()) {
    return { isValid: false, error: "Murmur cannot be empty" };
  }
  if (content.length > 280) {
    return { isValid: false, error: "Murmur cannot exceed 280 characters" };
  }
  return { isValid: true };
};
