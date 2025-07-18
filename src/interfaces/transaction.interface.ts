export interface Transaction {
  id?: number;
  wallet_id: number;
  type: 'credit' | 'debit';
  amount: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}