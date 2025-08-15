import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { authService, foodService } from '../api/services';

import type { LoginRequest, RegisterRequest, VerifyOtpRequest } from '../api/types';

// Query keys
export const queryKeys = {
  foods: ['foods'] as const,
  user: ['user'] as const,
} as const;

// Auth mutations
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: queryKeys.user });
      }
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (data, variables) => {
      // Save email to localStorage for OTP verification
      localStorage.setItem('pendingEmail', variables.email);
      // Redirect to OTP verification page
      window.location.href = '/verify-otp';
    },
  });
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (otpData: VerifyOtpRequest) => authService.verifyOtp(otpData),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        // Clear pending email from localStorage
        localStorage.removeItem('pendingEmail');
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: queryKeys.user });
      }
    },
  });
};

// Food queries
export const useFoods = () => useQuery({
  queryKey: queryKeys.foods,
  queryFn: () => foodService.getFoods(),
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
});

export const useFood = (id: string) => useQuery({
  queryKey: [...queryKeys.foods, id],
  queryFn: () => foodService.getFood(id),
  enabled: !!id,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
});

// Food mutations
export const useCreateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (foodData: any) => foodService.createFood(foodData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.foods });
    },
  });
};

export const useUpdateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, foodData }: { id: string; foodData: any }) => 
      foodService.updateFood(id, foodData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.foods });
    },
  });
};

// Utility hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem('authToken');
    // Clear all queries
    queryClient.clear();
  };
};
