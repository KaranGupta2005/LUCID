export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // TODO: Implement actual token verification
  req.user = { id: 'user123' };
  next();
};

export const authorize = (roles) => {
  return (req, res, next) => {
    // TODO: Implement role-based authorization
    next();
  };
};
