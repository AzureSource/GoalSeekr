import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import DifficultyCol from './DifficultyCol.jsx';

const Container = () => {
  const [difficulties ] = useState(['EASY', 'MEDIUM', 'HARD', 'INSANE']);

  return (
    <Flex className="columnsContainer" flexGrow="1" justifyContent="space-around">
      {
        difficulties.map((difficulty, index) => (
          <DifficultyCol key={index} difficulty={difficulty} />
        ))
      }
    </Flex>
  );
};

export default Container;