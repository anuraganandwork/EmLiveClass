import React, { useState } from 'react';

function TimeInput() {
  const [time, setTime] = useState({
    hours: '',
    minutes: '',
    period: 'AM'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTime(prevTime => ({
      ...prevTime,
      [name]: value
    }));
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        name="hours"
        value={time.hours}
        onChange={handleChange}
        min="1"
        max="12"
        className="w-16 px-2 py-1 border rounded"
        placeholder="HH"
      />
      <span>:</span>
      <input
        type="number"
        name="minutes"
        value={time.minutes}
        onChange={handleChange}
        min="0"
        max="59"
        className="w-16 px-2 py-1 border rounded"
        placeholder="MM"
      />
      <select
        name="period"
        value={time.period}
        onChange={handleChange}
        className="px-2 py-1 border rounded"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}

export default TimeInput;