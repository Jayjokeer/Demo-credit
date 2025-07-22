import request from 'supertest';
import  app  from '../src/index';

import { TransactionService } from '../src/services/transaction.services';
import { BadRequestError } from '../src/errors/error';

jest.mock('../src/services/transaction.services.ts');
const MockTxnService = TransactionService as jest.MockedClass<typeof TransactionService>;

describe('Transaction Routes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const fakeUserId = '1'; 
  const headers = { 'x-user-id': fakeUserId };

  it('POST /api/v1/transaction/fund → funds wallet', async () => {
    MockTxnService.prototype.fundWallet.mockResolvedValue({ balance: 5000 });

    const res = await request(app)
      .post('/api/v1/transaction/fund')
      .set(headers)
      .send({ amount: 5000 });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ balance: 5000 });
  });

  it('POST /api/v1/transaction/transfer → transfers funds', async () => {
    const transfer = { senderBalance: 2000, receiverBalance: 8000 };
    MockTxnService.prototype.transferFunds.mockResolvedValue(transfer);

    const res = await request(app)
      .post('/api/v1/transaction/transfer')
      .set(headers)
      .send({ receiverId: 2, amount: 3000 });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(transfer);
  });

  it('POST /api/v1/transaction/withdraw → withdraws successfully', async () => {
    MockTxnService.prototype.withdrawFromWallet.mockResolvedValue({ balance: 1500 });

    const res = await request(app)
      .post('/api/v1/transaction/withdraw')
      .set(headers)
      .send({ amount: 500 });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ balance: 1500 });
  });

  it('POST /api/v1/transaction/withdraw → insufficient funds error', async () => {
    MockTxnService.prototype.withdrawFromWallet.mockRejectedValue(new BadRequestError('Insufficient funds'));

    const res = await request(app)
      .post('/api/v1/transaction/withdraw')
      .set(headers)
      .send({ amount: 99999 });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Insufficient funds/);
  });
});
