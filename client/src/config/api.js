const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000';

export const config = {
  API_URL,
  SOCKET_URL,
  endpoints: {
    auth: {
      login: `${API_URL}/api/auth/login`,
      registerUser: `${API_URL}/api/auth/registerUser`,
      registerServiceProvider: `${API_URL}/api/auth/registerServiceProvider`,
      verify: `${API_URL}/api/auth/verify`,
    },
    users: {
      serviceProvider: `${API_URL}/api/users/serviceProvider`,
      gharUsers: `${API_URL}/api/users/gharUsers`,
      counts: `${API_URL}/api/users/counts`,
      upload: `${API_URL}/api/users/upload`,
      serviceProviderUpload: `${API_URL}/api/users/serviceProvider/upload`,
    },
    services: {
      list: `${API_URL}/api/services`,
      add: `${API_URL}/api/services/add`,
    },
    bookings: {
      list: `${API_URL}/api/bookings`,
      create: `${API_URL}/api/bookings`,
      getById: (id) => `${API_URL}/api/bookings/${id}`,
    },
    payments: {
      esewa: {
        initiate: `${API_URL}/api/payments/esewa/initiate`,
        status: (id) => `${API_URL}/api/payments/status/${id}`,
      },
    },
    reviews: {
      list: `${API_URL}/api/reviews`,
      create: `${API_URL}/api/reviews`,
    },
  },
};

export default config; 