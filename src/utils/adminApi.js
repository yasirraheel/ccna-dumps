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

export const adminFetch = (url, options = {}) => {
  const headers = {
    ...getAdminHeaders(),
    ...(options.headers || {})
  };
  return fetch(url, { ...options, headers });
};
