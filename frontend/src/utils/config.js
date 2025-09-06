export const SERVER_HOST = import.meta.env.VITE_SERVER_HOST || `localhost`;
export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 3000;
export const BASE_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;
export const API_PATHS = {
  AUTH: {
    LOGIN: `/api/auth/login`,
    REGISTER: `/api/auth/register`,
    GET_USER_INFO: `/api/auth/getUser`,
    UPDATE_PWD:`/api/auth/updatepwd`,
    UPDATE_USER: (userId) => `/api/auth/${userId}`,
  },
  DASHBOARD: {
    GET_DATA: `/api/v1/dashboard`,
  },
  INCOME: {
    ADD_INCOME: `/api/v1/income/add`,
    GET_ALL_INCOME: `/api/v1/income/get`,
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    UPDATE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
  },
  EXPENSE: {
    ADD_EXPENSE: `/api/v1/expense/add`,
    GET_ALL_EXPENSE: `/api/v1/expense/get`,
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    UPDATE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`,
  },
};
