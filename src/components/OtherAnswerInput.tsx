import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

type OtherAnswerInputProps = {
  control: Control<any>;
  questionIndex: number;
};

const OtherAnswerInput: React.FC<OtherAnswerInputProps> = ({ control, questionIndex }) => {
  return (
    <Controller
      name={`questions.${questionIndex}.otherAnswer`}
      control={control}
      render={({ field }) => <TextField {...field} label="Other Answer" variant="outlined" />}
    />
  );
};

export default OtherAnswerInput;
