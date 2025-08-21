import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api-client";
import { useAuth } from "@/contexts/AuthContext";
import { AuthResponse, LoginForm, SignupForm } from "@/types";
import { useRouter } from "next/navigation";

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation<AuthResponse, Error, LoginForm>({
    mutationFn: async (credentials) => {
      console.log(
        "🔐 useLogin: Starting API call with email:",
        credentials.email
      );
      const result = await authApi.login(credentials);
      console.log(
        "✅ useLogin: API call successful, token received:",
        !!result.token
      );
      return result;
    },
    onSuccess: (data) => {
      console.log(
        "✅ useLogin: Login successful, user data:",
        data.user.username
      );
      console.log("🔐 useLogin: Calling AuthContext login");
      login(data.user, data.token);
      console.log("🔄 useLogin: Redirecting to home page");
      // Use replace instead of push to prevent back navigation to login
      router.replace("/");
    },
    onError: (error) => {
      console.error("🚨 useLogin: Login failed:", error);
    },
  });
}

export function useSignup() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation<AuthResponse, Error, SignupForm>({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      login(data.user, data.token);
      router.push("/");
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();
  const router = useRouter();

  return () => {
    logout();
    router.push("/login");
  };
}
