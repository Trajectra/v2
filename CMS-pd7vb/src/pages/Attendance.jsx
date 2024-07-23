import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getAttendances, markAttendance } from 'wasp/client/operations';

const AttendancePage = () => {
  const { data: attendances, isLoading, error } = useQuery(getAttendances);
  const markAttendanceFn = useAction(markAttendance);
  const [newAttendanceData, setNewAttendanceData] = useState({ date: '', status: '' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleMarkAttendance = () => {
    markAttendanceFn(newAttendanceData);
    setNewAttendanceData({ date: '', status: '' });
  };

  return (
    <div className='p-4'>
      {attendances.map((attendance) => (
        <div key={attendance.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{attendance.date}</div>
          <div>{attendance.status}</div>
        </div>
      ))}
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Date'
          className='px-1 py-2 border rounded text-lg'
          value={newAttendanceData.date}
          onChange={(e) => setNewAttendanceData({ ...newAttendanceData, date: e.target.value })}
        />
        <input
          type='text'
          placeholder='Status'
          className='px-1 py-2 border rounded text-lg'
          value={newAttendanceData.status}
          onChange={(e) => setNewAttendanceData({ ...newAttendanceData, status: e.target.value })}
        />
        <button
          onClick={handleMarkAttendance}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Mark Attendance
        </button>
      </div>
    </div>
  );
}

export default AttendancePage;