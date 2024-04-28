type Role = 'User' | 'Admin';

export interface User {
  id: string;
  role: Role;
  email: string;
  name: string;
  dateOfBirth: null;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  enabled: boolean;
  gender: string;
}
