import React, { useState, useContext} from 'react';
import { ModeContext } from './App';

const ClassRow = ({ meetingId, time, onJoinAsTeacher, onJoinAsStudent, onDelete }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingId);
      alert('Meeting ID copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-2">
      <div>
        <p className="font-semibold">Meeting ID: {meetingId}</p>
        <p className="text-sm text-gray-600">Time: {time}</p>
      </div>
      <button
        onClick={handleCopy}
        className="ml-2 text-gray-500 hover:text-gray-700"
        title="Copy Meeting ID"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <div>
        <button
          onClick={onJoinAsTeacher}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Join as Teacher
        </button>
        <button
          onClick={onJoinAsStudent}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Join as Student
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const ScheduledClassesDialog = ({ isOpen, onClose, onJoin }) => {
  const [classes, setClasses] = useState([
    { id: 1, meetingId: 'tl4f-2m44-fax1', time: '10:00 AM' },
    { id: 2, meetingId: 'e28y-kg59-bs7w', time: '2:00 PM' },
    { id: 3, meetingId: 'h78e-pfbo-rxz5', time: '4:30 PM' },
    { id: 4, meetingId: 'h78e-pfbo-rxz5', time: '4:30 PM' },
  ]);

  const {ModeOfEntry, setModeOfEntry} = useContext(ModeContext)
  const handleJoinAsTeacher = async (meetingId) => {
    // Implement join as teacher logic
  };

  const handleJoinAsStudent = async (meetingId) => {
    console.log(`Joining meeting as student: ${meetingId}`);
    onJoin(meetingId);
  };

  const handleDelete = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-100 rounded-lg shadow-xl max-w-lg w-full mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Scheduled Classes</h2>
        
        <div className="max-h-96 overflow-y-auto">
          {classes.map((classItem) => (
            <ClassRow
              key={classItem.id}
              meetingId={classItem.meetingId}
              time={classItem.time}
              onJoinAsTeacher={() => {setModeOfEntry(true)
                onJoin(classItem.meetingId)
              }}
              onJoinAsStudent={() => {
                setModeOfEntry(false)
                onJoin(classItem.meetingId)}}
              onDelete={() => handleDelete(classItem.id)}
            />
          ))}
        </div>
        
        {classes.length === 0 && (
          <p className="text-gray-600 text-center my-4">No scheduled classes.</p>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full  text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          style={{ backgroundColor: '#f97316', }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ScheduledClassesDialog;
