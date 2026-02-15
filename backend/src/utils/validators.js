export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateTask = (task) => {
  if (!task.title || typeof task.title !== 'string') {
    return { valid: false, error: 'Title is required' };
  }
  return { valid: true };
};
