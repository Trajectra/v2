import React from 'react';
import { useQuery, getSchedules, getAttendances, getFees, getTransactions } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useQuery(getSchedules);
  const { data: attendances, isLoading: attendancesLoading, error: attendancesError } = useQuery(getAttendances);
  const { data: fees, isLoading: feesLoading, error: feesError } = useQuery(getFees);
  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useQuery(getTransactions);

  if (schedulesLoading || attendancesLoading || feesLoading || transactionsLoading) return 'Loading...';
  if (schedulesError || attendancesError || feesError || transactionsError) return 'Error: ' + (schedulesError || attendancesError || feesError || transactionsError);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>Upcoming Classes</h2>
          {schedules.map((schedule) => (
            <div key={schedule.id} className='py-2'>
              <p>{schedule.className}</p>
              <p>{schedule.date}</p>
            </div>
          ))}
        </div>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>Attendance Rate</h2>
          <p>Overall Attendance Rate: XX%</p>
        </div>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>Fee Status</h2>
          <p>Total Fees Due: $XXXX</p>
        </div>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>Transactions</h2>
          {transactions.map((transaction) => (
            <div key={transaction.id} className='py-2'>
              <p>{transaction.type}: ${transaction.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;