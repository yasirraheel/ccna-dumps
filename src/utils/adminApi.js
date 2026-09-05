// Authenticated Admin API Helper
export const getAdminHeaders = () => {
  const token = localStorage.getItem('ccna_auth_token') || '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const adminFetch = (url, options = {}) => {
  const headers = {
    ...getAdminHeaders(),
    ...(options.headers || {})
  };
  return fetch(url, { ...options, headers });
};
