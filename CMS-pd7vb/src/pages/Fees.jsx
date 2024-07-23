import React, { useState } from 'react';
import { useQuery, useAction, getFees, payFee } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const FeesPage = () => {
  const { data: fees, isLoading, error } = useQuery(getFees);
  const payFeeFn = useAction(payFee);
  const [newFeeAmount, setNewFeeAmount] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handlePayFee = () => {
    payFeeFn({ amount: newFeeAmount });
    setNewFeeAmount(0);
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='number'
          placeholder='Enter Fee Amount'
          className='px-1 py-2 border rounded text-lg'
          value={newFeeAmount}
          onChange={(e) => setNewFeeAmount(parseInt(e.target.value))}
        />
        <button
          onClick={handlePayFee}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Pay Fee
        </button>
      </div>
      <div>
        {fees.map((fee) => (
          <div
            key={fee.id}
            className='py-2 px-2 flex items-center hover:bg-gray-100 gap-x-2 rounded'
          >
            <p>{fee.amount}</p>
            <p>{fee.description}</p>
            <Link
              to={`/fee/${fee.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeesPage;