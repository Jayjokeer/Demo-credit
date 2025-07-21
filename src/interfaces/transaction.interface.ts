export interface Transaction {
  id?: number;
  sender_wallet_id: number;
  receiver_wallet_id: number;
  type: 'fund' | 'transfer' | 'withdraw';
  amount: number;
  status: 'pending' | 'success' | 'failed';
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}