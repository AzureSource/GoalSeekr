import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { Tag } from '@chakra-ui/react';

const CurrencyBar = () => {
  const [currency, setCurrency] = useState();
  const {id} = useParams();
  const taskUpdatedFlag = useSelector((state) => state.currencyUpdateFlag.updateFlag);

  useEffect(
    () => {
      axios.get(`/api/currency/${id}`)
        .then((results) => {
          setCurrency(parseInt(results.data));
        })
        .catch((err) => console.log('issue getting currency line 18:\n', err));
    }, [id, taskUpdatedFlag]
  );

  return (
    <Flex
      className="currBarContainer"
      mt=".5rem" h="100%"
      w="50%" size="lg"
    >
      <Tag
        className="currBar"
        background='rgb(80 182 171)'
        w="100%"
        fontSize="2xl" justifyContent="center"
        border="1px solid" borderRadius="5px"
      >
        Total currency: ${currency}
      </Tag>
    </Flex>
  );
};

export default CurrencyBar;