export interface User {
  id: string;
  email: string;
  name: string;
}

export async function login(email: string, password: string): Promise<User> {
  // TODO: Implement authentication
  throw new Error('Not implemented');
}

export async function logout(): Promise<void> {
  // TODO: Implement logout
}

export function getUser(): User | null {
  // TODO: Get current user from session
  return null;
}
