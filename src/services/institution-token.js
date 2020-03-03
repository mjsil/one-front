export const TOKEN_KEY = "@onenet-usr";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};