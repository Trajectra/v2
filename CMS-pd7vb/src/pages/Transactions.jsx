import React, { useState } from 'react';
import { useQuery, useAction, getTransactions, makeTransaction } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const TransactionsPage = () => {
  const { data: transactions, isLoading, error } = useQuery(getTransactions);
  const makeTransactionFn = useAction(makeTransaction);
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [newTransactionDescription, setNewTransactionDescription] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleMakeTransaction = () => {
    makeTransactionFn({ amount: newTransactionAmount, description: newTransactionDescription });
    setNewTransactionAmount(0);
    setNewTransactionDescription('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='number'
          placeholder='Amount'
          className='px-1 py-2 border rounded text-lg'
          value={newTransactionAmount}
          onChange={(e) => setNewTransactionAmount(Number(e.target.value))}
        />
        <input
          type='text'
          placeholder='Description'
          className='px-1 py-2 border rounded text-lg'
          value={newTransactionDescription}
          onChange={(e) => setNewTransactionDescription(e.target.value)}
        />
        <button
          onClick={handleMakeTransaction}
          className='bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Transaction
        </button>
      </div>
      <div>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className='py-2 px-2 flex items-center hover:bg-gray-100 gap-x-2 rounded'
          >
            <p>{transaction.description}</p>
            <p>{transaction.amount}</p>
            <Link
              to={`/transaction/${transaction.id}`}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionsPage;