export const fetchUser = async (userId: string) => {
  const response = await fetch(`https://your-api-endpoint.com/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await fetch('https://your-api-endpoint.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};