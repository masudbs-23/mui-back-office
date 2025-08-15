import apiClient from './config';
import { AUTH_ENDPOINTS, FOOD_ENDPOINTS } from './endpoints';

import type {
  LoginRequest,
  AuthResponse,
  FoodsResponse,
  Food,
  RegisterRequest,
  VerifyOtpRequest,
} from './types';

// Auth services
export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  verifyOtp: async (otpData: VerifyOtpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_OTP, otpData);
    return response.data;
  },
};

// Food services
export const foodService = {
  getFoods: async (): Promise<FoodsResponse> => {
    const response = await apiClient.get(FOOD_ENDPOINTS.GET_FOODS);
    return response.data;
  },

  getFood: async (id: string): Promise<Food> => {
    const response = await apiClient.get(FOOD_ENDPOINTS.GET_FOOD(id));
    return response.data;
  },

  createFood: async (foodData: any): Promise<Food> => {
    const response = await apiClient.post(FOOD_ENDPOINTS.CREATE_FOOD, foodData);
    return response.data;
  },

  updateFood: async (id: string, foodData: any): Promise<Food> => {
    const response = await apiClient.put(FOOD_ENDPOINTS.UPDATE_FOOD(id), foodData);
    return response.data;
  },
};
