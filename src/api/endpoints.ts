// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_OTP: '/verify-otp',
} as const;

// Food endpoints
export const FOOD_ENDPOINTS = {
  GET_FOODS: '/foods',
  GET_FOOD: (id: string) => `/foods/${id}`,
  CREATE_FOOD: '/foods',
  UPDATE_FOOD: (id: string) => `/foods/${id}`,
} as const;

// All endpoints
export const ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  ...FOOD_ENDPOINTS,
} as const;
