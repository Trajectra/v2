import React, { useState } from 'react';
import { useQuery, useAction, getSchedules, createSchedule } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const SchedulingPage = () => {
  const { data: schedules, isLoading, error } = useQuery(getSchedules);
  const createScheduleFn = useAction(createSchedule);
  const [newScheduleInfo, setNewScheduleInfo] = useState({});

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateSchedule = () => {
    createScheduleFn(newScheduleInfo);
    setNewScheduleInfo({});
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='Schedule Title'
          className='border p-2 rounded'
          value={newScheduleInfo.title || ''}
          onChange={(e) => setNewScheduleInfo({ ...newScheduleInfo, title: e.target.value })}
        />
        <button
          onClick={handleCreateSchedule}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create Schedule
        </button>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {schedules.map((schedule) => (
          <div key={schedule.id} className='p-4 border rounded'>
            <p>{schedule.title}</p>
            <p>{schedule.date}</p>
            <Link to={`/schedule/${schedule.id}`} className='text-blue-500'>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchedulingPage;