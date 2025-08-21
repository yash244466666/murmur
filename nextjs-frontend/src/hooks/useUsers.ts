import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi, followsApi } from "@/lib/api-client";
import { ProfileResponse, FollowersResponse, FollowingResponse } from "@/types";

export function useProfile(username: string) {
  return useQuery<ProfileResponse, Error>({
    queryKey: ["profile", username],
    queryFn: () => usersApi.getProfile(username),
    enabled: !!username,
  });
}

export function useFollowers(username: string) {
  return useQuery<FollowersResponse, Error>({
    queryKey: ["followers", username],
    queryFn: () => usersApi.getFollowers(username),
    enabled: !!username,
  });
}

export function useFollowing(username: string) {
  return useQuery<FollowingResponse, Error>({
    queryKey: ["following", username],
    queryFn: () => usersApi.getFollowing(username),
    enabled: !!username,
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: followsApi.followUser,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: followsApi.unfollowUser,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
  });
}
