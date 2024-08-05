import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import Question from './Question';

type ListQuestionsProps = {
  control: Control<any>;
};

const ListQuestions: React.FC<ListQuestionsProps> = ({ control }) => {
  // Por enquanto posso fazer uma tela com opções de user_groups já pré criados
  // Request solicitando o user_group que foi selecionado anteriormente passado por argumento na URL
  const { fields } = useFieldArray({
    control,
    name: 'questions',
  });

  return (
    <>
      {fields.map((field, index) => (
        <Question key={field.id} control={control} index={index} />
      ))}
    </>
  );
};

export default ListQuestions;
