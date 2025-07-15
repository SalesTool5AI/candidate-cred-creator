export const isDevelopment = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.includes('lovable.app') ||
    hostname.includes('vercel.app') ||
    hostname.includes('netlify.app') ||
    process.env.NODE_ENV === 'development'
  );
};

export const createMockUser = () => ({
  id: 'dev-user-123',
  email: 'developer@example.com',
  user_metadata: {
    name: 'Developer'
  },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});