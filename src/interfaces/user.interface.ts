export interface User {
  id?: number;
  name: string;
  email: string;
  wallet_balance?: number;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}
