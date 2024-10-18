import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const InterviewForm = ({ setInterviewType }) => {
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setInterviewType(type);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <TextField
        select
        label="Select Interview Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        className="mb-4"
      >
        <MenuItem value="student visa">Student Visa</MenuItem>
        <MenuItem value="education">Education</MenuItem>
        {/* Add more options as needed */}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Start Chat
      </Button>
    </form>
  );
};

export default InterviewForm; 