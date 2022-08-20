import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateFlag } from './currencyUpdateFlag';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import {
  Tag,
} from '@chakra-ui/react';

const CurrencyBar = ({taskUpdated}) => {
  const [currency, setCurrency] = useState();
  const {id} = useParams();
  const dispatch = useDispatch();
  const taskUpdatedFlag = useSelector((state) => state.currencyUpdateFlag.updateFlag);
  console.log(taskUpdatedFlag, 'taskupdatedflag');

  useEffect(
    () => {
      axios.get(`/api/currency/${id}`)
        .then((results) => {
          console.log(results.data);
          setCurrency(parseInt(results.data));
        })
        .catch((err) => console.log('issue getting currency line 18:\n', err));
    }, [id, taskUpdated]
  );

  return (
    <Flex
      className="currBarContainer"
      m=".5rem" h="55%"
      w="50%" size="lg"
    >
      <div onClick={() => {
        console.log(taskUpdatedFlag);
        dispatch(setUpdateFlag());
      }}>CLICK MEEE</div>
      <Tag
        className="currBar"
        colorScheme="teal" w="100%"
        fontSize="2xl" justifyContent="center"
        border="1px solid" borderRadius="10px"
      >
        Total currency: ${currency}
      </Tag>
    </Flex>
  );
};

export default CurrencyBar;