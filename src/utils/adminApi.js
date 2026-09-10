// Authenticated Admin API Helper
export const getAdminHeaders = () => {
  const token = localStorage.getItem('ccna_auth_token') || '';
  let email = '';
  try {
    const u = JSON.parse(localStorage.getItem('ccna_auth_user') || '{}');
    email = u.email || '';
  } catch {}

  // Fallback to candidate@ccna.com if not signed in or not found
  if (!email) {
    email = 'candidate@ccna.com';
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
    'X-Admin-Token': token,
    'X-Admin-Email': email
  };
};

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export const adminFetch = (url, options = {}) => {
  const finalUrl = url.startsWith('http')
    ? url
    : `${API_BASE_URL.replace(/\/api$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
  const headers = {
    ...getAdminHeaders(),
    ...(options.headers || {})
  };
  return fetch(finalUrl, { ...options, headers });
};
