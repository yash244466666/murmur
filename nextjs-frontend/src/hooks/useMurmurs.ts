import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { murmursApi, likesApi } from "@/lib/api-client";
import { Murmur, MurmurForm, TimelineResponse } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

export function useTimeline() {
  const { isAuthenticated } = useAuth();

  return useQuery<TimelineResponse, Error>({
    queryKey: ["timeline"],
    queryFn: async () => {
      console.log("📰 useTimeline: Fetching timeline data");
      const result = await murmursApi.getTimeline();
      console.log(
        "✅ useTimeline: Timeline data received, murmurs:",
        result.murmurs.length
      );
      return result;
    },
    enabled: isAuthenticated,
    retry: (failureCount, error: Error) => {
      // Don't retry on 401 errors
      const axiosError = error as { response?: { status: number } };
      if (axiosError?.response?.status === 401) {
        console.log("🚨 useTimeline: 401 error, not retrying");
        return false;
      }
      console.log("🔄 useTimeline: Retrying, attempt:", failureCount);
      return failureCount < 3;
    },
  });
}

export function useMyMurmurs() {
  return useQuery<Murmur[], Error>({
    queryKey: ["my-murmurs"],
    queryFn: murmursApi.getMyMurmurs,
  });
}

export function useMurmur(id: number) {
  return useQuery<Murmur, Error>({
    queryKey: ["murmur", id],
    queryFn: () => murmursApi.getMurmur(id),
    enabled: !!id,
  });
}

export function useCreateMurmur() {
  const queryClient = useQueryClient();

  return useMutation<Murmur, Error, MurmurForm>({
    mutationFn: murmursApi.createMurmur,
    onSuccess: () => {
      // Invalidate and refetch timeline and my murmurs
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["my-murmurs"] });
    },
  });
}

export function useDeleteMurmur() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: murmursApi.deleteMurmur,
    onSuccess: () => {
      // Invalidate and refetch timeline and my murmurs
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["my-murmurs"] });
    },
  });
}

export function useLikeMurmur() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: likesApi.likeMurmur,
    onSuccess: () => {
      // Invalidate all murmur-related queries
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["my-murmurs"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUnlikeMurmur() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: likesApi.unlikeMurmur,
    onSuccess: () => {
      // Invalidate all murmur-related queries
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["my-murmurs"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
