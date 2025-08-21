import { User } from "@/types";
import Cookies from "js-cookie";

export const authUtils = {
  setAuthToken: (token: string) => {
    console.log("🍪 authUtils: Setting auth token, length:", token.length);
    Cookies.set("auth_token", token, { expires: 1 }); // 1 day
    console.log("🍪 authUtils: Token set successfully");
  },

  getAuthToken: (): string | undefined => {
    const token = Cookies.get("auth_token");
    console.log("🍪 authUtils: Getting auth token, found:", !!token);
    return token;
  },

  removeAuthToken: () => {
    console.log("🍪 authUtils: Removing auth tokens");
    Cookies.remove("auth_token");
    Cookies.remove("current_user");
    console.log("🍪 authUtils: Tokens removed");
  },

  setCurrentUser: (user: User) => {
    console.log("🍪 authUtils: Setting current user:", user.username);
    Cookies.set("current_user", JSON.stringify(user), { expires: 1 });
    console.log("🍪 authUtils: User set successfully");
  },

  getCurrentUser: (): User | null => {
    const userStr = Cookies.get("current_user");
    console.log("🍪 authUtils: Getting current user, found:", !!userStr);
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log("🍪 authUtils: User parsed successfully:", user.username);
        return user;
      } catch (error) {
        console.error("🍪 authUtils: Error parsing user data:", error);
        return null;
      }
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    const hasToken = !!Cookies.get("auth_token");
    console.log("🍪 authUtils: Checking authentication:", hasToken);
    return hasToken;
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
  // Generate a beautiful avatar URL using the username
  const gradientColors = [
    "6366f1", // Indigo
    "8b5cf6", // Violet
    "ec4899", // Pink
    "ef4444", // Red
    "f97316", // Orange
    "eab308", // Yellow
    "22c55e", // Green
    "06b6d4", // Cyan
    "3b82f6", // Blue
    "a855f7", // Purple
  ];

  // Use multiple characters for better distribution
  const hash = username
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = hash % gradientColors.length;

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    username.replace("_", " ")
  )}&background=${
    gradientColors[colorIndex]
  }&color=ffffff&size=200&bold=true&font-size=0.6`;
};

export const generateLargeAvatar = (username: string): string => {
  // For profile pages and larger displays
  const gradientColors = [
    "6366f1",
    "8b5cf6",
    "ec4899",
    "ef4444",
    "f97316",
    "eab308",
    "22c55e",
    "06b6d4",
    "3b82f6",
    "a855f7",
  ];

  const hash = username
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = hash % gradientColors.length;

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    username.replace("_", " ")
  )}&background=${
    gradientColors[colorIndex]
  }&color=ffffff&size=400&bold=true&font-size=0.5`;
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
