const AUTH_STORAGE_KEY = "auth";

const getStoredAuth = () => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return { token: null, user: null };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      token: parsed?.token || null,
      user: parsed?.user || null
    };
  } catch {
    return { token: null, user: null };
  }
};

const setStoredAuth = (value) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
};

const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export { clearStoredAuth, getStoredAuth, setStoredAuth };
