import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api-client";
import { useAuth } from "@/contexts/AuthContext";
import { AuthResponse, LoginForm, SignupForm } from "@/types";
import { useRouter } from "next/navigation";

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation<AuthResponse, Error, LoginForm>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log("Login successful, user data:", data);
      login(data.user, data.token);
      // Use replace instead of push to prevent back navigation to login
      router.replace("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
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
