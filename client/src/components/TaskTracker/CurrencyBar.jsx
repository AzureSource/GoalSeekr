import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import {
  Tag,
} from '@chakra-ui/react';

const CurrencyBar = () => {
  const [currency, setCurrency] = useState();
  const {id} = useParams();
  console.log(id, 'currecncy line 11');

  useEffect(
    () => {
      axios.get(`/api/currency/${id}`)
        .then((results) => setCurrency(parseInt(results.data)))
        .catch((err) => console.log('issue getting currency line 18:\n', err));
    }, [id]
  );

  return (
    <Flex className="currBarContainer" m=".5rem"
      h="55%" w="50%" size="lg"
    >
      <Tag className="currBar" colorScheme="teal" w="100%" fontSize="2xl" justifyContent="center"
        border="1px solid" borderRadius="10px"
      >
        Currency earned: ${currency}
      </Tag>
    </Flex>
  );
};

export default CurrencyBar;