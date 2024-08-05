import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import ListAnswers from './ListAnswers';

type QuestionProps = {
  control: Control<any>;
  index: number;
};

const Question: React.FC<QuestionProps> = ({ control, index }) => {
  const answers = useWatch({ control, name: `questions.${index}.answers` });

  return (
    <div>
      <p>PERGUNTA</p>
      <ListAnswers control={control} questionIndex={index} />
    </div>
  );
};

export default Question;
