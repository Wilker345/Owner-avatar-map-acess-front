import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';

type ListAnswersProps = {
  control: Control<any>;
  questionIndex: number;
};

const ListAnswers: React.FC<ListAnswersProps> = ({ control, questionIndex }) => {
  const { fields } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  return (
    <RadioGroup>
      {fields.map((field, index) => (
        <FormControlLabel
          key={field.id}
          value={field.value}
          control={<Radio />}
          label={field.value}
        />
      ))}
    </RadioGroup>
  );
};

export default ListAnswers;
